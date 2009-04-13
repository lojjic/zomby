/**
 * @class Animation timeline.
 *
 * @constructor
 */
zomby.model.Timeline = zomby.model.ModelObject.extend(
/** @scope zomby.model.Timeline.prototype */
{
	frame : 0, //the first frame is 1
	fps: 10,
	length : 100,
	loop : false,
	library : null,
	layers : null,
	keyframes : null,
	width : 100,
	height : 100,

	constructor : function(props) {
		this.base(props);
		this.library = new zomby.model.Library(props.library);
		this.layers = [];
		zomby.Util.each(props.layers, function(lyr) {
			this.layers.push(new zomby.model.Layer(lyr, this));
		}, this);
	},

	/**
	 * Advance one frame. When reaching the end of the timeline, it will either loop
	 * back to the beginning if the timeline is set to loop, otherwise the animation
	 * will be stopped.
	 */
	step : function() {
		if(this.frame + 1 > this.length) {
			if(this.loop) {
				this.go(1);
			} else {
				this.stop();
			}
		} else {
			this.go(this.frame + 1);
		}
	},

	/**
	 * Go directly to a specific frame
	 * @param {Integer} frame
	 */
	go : function(frame) {
		this.frame = frame;
		this.sync();
	},

	/**
	 * Sync the state of all shapes in all layers to the current frame.
	 */
	sync : (function() {
		var Easing = zomby.model.Easing,
			each = zomby.Util.each;

		function tweenRecursive(model, fromProps, toProps, easing, curFrame, totFrames) {
			var p, to, from, toType, fromType;
			for(p in toProps) {
				to = toProps[p];
				from = (fromProps ? fromProps[p] : null);
				toType = typeof to, fromType = typeof from;
				if(fromType === toType && toType === "number") {
					model[p] = easing.execute(curFrame, from, to - from, totFrames);
				}
				else if(toType === fromType && fromType === "object" && typeof model[p] === fromType) {
					tweenRecursive(model[p], from, to, easing, curFrame, totFrames);
				}
			}
		}

		function copyRecursive(from, to) {
			var p, fromVal, toVal, fromType;
			for(p in from) {
				fromVal = from[p];
				toVal = to[p];
				fromType = typeof fromVal;
				if(toVal && typeof toVal === fromType && fromType === "object") {
					copyRecursive(fromVal, toVal);
				}
				else if(fromType !== "function") {
					to[p] = fromVal;
				}
			}
			return to;
		}

		function applyActiveTweens(activeTweens, frame) {
			var i, len, tweenInfo;
			for(i=0, len=activeTweens.length; i<len;) {
				tweenInfo = activeTweens[i];
				if(frame > tweenInfo.begin + tweenInfo.duration) {
					// tween is expired; remove it
					activeTweens.splice(i, 1);
					len--;
				} else {
					tweenInfo.tween(frame);
					i++;
				}
			}
		}

		function TweenInfo(shape, begin, fromProps, def, library) {
			var easing;
			this.shape = shape;
			this.begin = begin - 1;
			this.duration = def.frames;
			this.easing = ((easing = def.easing) && typeof easing === "string" && easing.indexOf("lib:") === 0 &&
							library.get(easing.substring(4))) || Easing.Linear;
			this.fromProps = fromProps;
			this.toProps = def.to;
		}
		TweenInfo.prototype.tween = function(frame) {
			tweenRecursive(this.shape, this.fromProps, this.toProps, this.easing, frame - this.begin, this.duration);
		};

		return function() {
			var CACHE_LAST_TWEENS = "lastTweens",
				currentFrame = this.frame,
				lastRefKfIdx = this.getPrivate("lastRefKfIdx"),
				refKfIdx = this.getNearestPastKeyframeIndex(),
				keyframes = this.keyframes,
				refKf = keyframes[refKfIdx],
				isKf = (refKf.frame === currentFrame),
				activeTweens,
				i, len, tweenInfo, shapeDef, shape, tweenDefs, layerIdx, shapeIdx, kf, shapes, addTweenInfo;

			// execute onEnter listener if keyframe
			if(isKf) {
				//refKf.doOnEnter(this.timeline, this);
			}

			/* Each keyframe has zero or more handlers and zero or more layer defs.
			   Each layer def has static properties and/or any number of tweens with their own easing.
			   For any given frame, we need the following info:
			      1) Which layers contain shapes being displayed
			      2) Of those layers, which out of all their shapes are currently being displayed
			      3) For each shape:
			        a) The full set of static properties for the most recent keyframe
			        b) All the active tweens for the shape

			   All of the above can be cached in forward-playing frame order
			*/

			if(refKfIdx === lastRefKfIdx) {
				// Same keyframe as last sync; can use the cached tweens directly
				activeTweens = this.getPrivate(CACHE_LAST_TWEENS);
				applyActiveTweens(activeTweens, currentFrame);
			}
			else {
				// If this keyframe is after the last, we only have to pay attention to the static
				// properties between the old and new; also we can use the same set of tweens but
				// remove any that have expired and add any new ones.
				if(lastRefKfIdx < refKfIdx) {
					activeTweens = this.getPrivate(CACHE_LAST_TWEENS);
					i = lastRefKfIdx + 1;
				}
				// Otherwise we have to build everything up from scratch.
				else {
					activeTweens = this.setPrivate(CACHE_LAST_TWEENS, []);
					i = 0;
					each(this.layers, function(layer) {
						layer.resetShapes();
					});
				}

				applyActiveTweens(activeTweens, currentFrame);

				addTweenInfo = function(tweenDef) {
					// If it has already expired, copy its ending values directly
					if(currentFrame >= tweenDef.begin + tweenDef.duration) {
						copyRecursive(tweenDef.to, shape);
					}
					// otherwise add it to the list of active tweens, and invoke it if necessary
					else {
						var info = new TweenInfo(shape, kf.frame, copyRecursive(shape, {}), tweenDef, this.library);
						activeTweens.push(info);
						if(kf.frame !== currentFrame) {
							info.tween(currentFrame);
						}
					}
				};

				while(i<=refKfIdx) {
					kf = keyframes[i++];
					for(layerIdx in kf.layers) {
						shapes = kf.layers[layerIdx];
						for(shapeIdx in shapes) {
							shapeDef = shapes[shapeIdx];
							shape = this.layers[layerIdx].getShape(shapeIdx);
							// Copy static properties to each shape directly
							copyRecursive(shapeDef.properties, shape);

							// Add any new tweens to the set of active tweens
							if(tweenDefs = shapeDef.tweens) {
								each(tweenDefs, addTweenInfo, this);
							}
						}
					}
				}
			}

			// execute onExit listener if keyframe
			if(isKf) {
				//refKf.doOnExit(this.timeline, this);
			}
		};
	})(),

	/**
	 * Find the index of the reference Keyframe for the current frame,
	 * i.e. the one that is either equal to the current frame or the
	 * most recent one.
	 */
	getNearestPastKeyframeIndex: function() {
		var CACHE_LAST_KF_IDX = "lastRefKfIdx",
			me = this,
			kf = me.keyframes,
			f = me.frame,
			last = me.getPrivate(CACHE_LAST_KF_IDX) || 0,
			i = last,
			len = kf.length,
			next;

		// The most common case for normal forward-playing is that the
		// reference keyframe will be either the same as or one after that of the
		// last tested frame. Therefore we start by testing the cached index,
		// then step forward to the end, and then start back at zero.
		do {
			next = kf[i + 1];
			if (kf[i].frame <= f && (!next || next.frame > f)) {
				return me.setPrivate(CACHE_LAST_KF_IDX, i);
			}
			i++;
			if(i === len) {
				i = 0;
			}
		} while(i !== last);
	}
});