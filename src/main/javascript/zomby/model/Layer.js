/**
 * @class Layer of a timeline.
 *
 * @constructor
 */
(function() {

var CACHE_LAST_KF_PROPS = "_lastKfProps",
	CACHE_LAST_KF_IDX = "_lastRefKfIdx",
	CACHE_REAL_SHAPE = "_realShape",
	CACHE_INITIAL_SHAPE = "_initialShape",
	TYPE_OBJECT = "object";

zomby.model.Layer = zomby.model.ModelObject.extend(
/** @scope zomby.model.Layer.prototype */
{
	frame : 0,
	startFrame : 0,
	endFrame : 100,
	shape : null,

	constructor : function(props, timeline) {
		var me = this;
		me.base(props);
		me.timeline = timeline;
		me.keyframes = [];
		zomby.Util.each(props.keyframes, function(kf) {
			me.keyframes.push(new zomby.model.Keyframe(kf));
		});
	},

	/**
	 * Go directly to a specific frame
	 * @param {Number} frame
	 */
	go : function(frame) {
		this.frame = frame;
		this.sync();
	},

	/**
	 * Get the Shape object; if the shape is a reference to a library
	 * object ("lib:shapeid"), dereference it to a clone of that library object.
	 */
	getShape: function() {
		var me = this,
			s = me.getPrivate(CACHE_REAL_SHAPE);
		if( !s ) {
			s = me.getInitialShape().clone();
			me.setPrivate(CACHE_REAL_SHAPE, s);
		}
		return s;
	},

	getInitialShape: function() {
		var me = this,
			s = me.getPrivate(CACHE_INITIAL_SHAPE);
		if(!s) {
			s = me.shape;
			if(typeof s === "string" && s.indexOf("lib:") === 0) {
				s = s.substring(4);
				s = me.timeline.library.get(s);
				me.setPrivate(CACHE_INITIAL_SHAPE, s);
			}
		}
		return s;
	},

	/**
	 * Sync the given {@link zomby.model.shape.Shape}'s properties to the current frame
	 */
	sync : (function() {
		var Easing = zomby.anim.Easing;

		function tweenRecursive(model, fromProps, toProps, easing, curFrame, totFrames) {
			for(var p in toProps) {
				var to = toProps[p],
					from = (fromProps ? fromProps[p] : null),
					toType = typeof to, fromType = typeof from;
				if(fromType === toType && toType === "number") {
					model[p] = easing(curFrame, from, to - from, totFrames);
				}
				else if(toType === TYPE_OBJECT && fromType === TYPE_OBJECT && typeof model[p] === TYPE_OBJECT) {
					tweenRecursive(model[p], from, to, easing, curFrame, totFrames);
				}
			}
		}

		function copyRecursive(from, to) {
			for(var p in from) {
				var fromVal = from[p],
					toVal = to[p],
					fromType = typeof fromVal;
				if(toVal && typeof toVal === TYPE_OBJECT && fromType === TYPE_OBJECT) {
					copyRecursive(fromVal, toVal);
				}
				else if(fromType !== "function") {
					to[p] = fromVal;
				}
			}
		}

		return function() {
			var me = this,
				keyframes = me.keyframes,
				lastKfIdx = me.getPrivate(CACHE_LAST_KF_IDX),
				kfIdx = me.getReferenceKeyframeIndex(),
				refKf = keyframes[kfIdx], nextKf,
				isKeyframe = (refKf.index === me.frame),
				s = me.getShape(),
				tl = me.timeline,
				fullProps, propsToSync, i, props;

			// execute onEnter listener if keyframe
			if(isKeyframe) {
				refKf.doOnEnter(tl, me);
			}

			// Make sure the shape is synced with the reference keyframe, being careful to avoid
			// setting properties that don't need syncing.
			// If tweening, we need a full set of "before" numeric values for calculating the tween.

			if(lastKfIdx === kfIdx) {
				// can use cached fullProps, and already in sync with reference keyframe
				fullProps = me.getPrivate(CACHE_LAST_KF_PROPS);
			} else {
				propsToSync = {};
				if(lastKfIdx < kfIdx) {
					// can use cached values as a starting point but must bring them up to date
					fullProps = me.getPrivate(CACHE_LAST_KF_PROPS);
					for(i=lastKfIdx + 1; i<=kfIdx; i++) {
						props = keyframes[i].properties;
						if(props) {
							copyRecursive(props, fullProps);
							copyRecursive(props, propsToSync);
						}
					}
				} else {
					// can't use any cached values, and everything must be synced
					fullProps = propsToSync;
					copyRecursive(me.getInitialShape(), fullProps);
					for(i=0; i<=kfIdx; i++) {
						props = keyframes[i].properties;
						if(props) {
							copyRecursive(props, fullProps);
						}
					}
				}
				// Sync shape to reference keyframe
				copyRecursive(propsToSync, s);
				// Save the full set of values for next time
				me.setPrivate(CACHE_LAST_KF_PROPS, fullProps);
			}

			// execute onExit listener if keyframe:
			if(isKeyframe) {
				refKf.doOnExit(tl, me);
			}
			// In between tweened keyframes; calculate the tweened numeric values:
			else if((nextKf = keyframes[kfIdx + 1]) && nextKf.tween && nextKf.properties) {
				tweenRecursive(s, fullProps, nextKf.properties,
					Easing[nextKf.easing || "linear"], me.frame - refKf.index, nextKf.index - refKf.index);
			}
		};
	})(),

	/**
	 * Find the index of the reference Keyframe for the current frame,
	 * i.e. the one that is either equal to the current frame or the
	 * most recent one.
	 */
	getReferenceKeyframeIndex: function() {
		var me = this,
			kf = me.keyframes,
			f = me.frame,
			last = me.getPrivate(CACHE_LAST_KF_IDX) || 0,
			i = last,
			len = kf.length,
			next;

		// The most common case for normal forward-playing is that either
		// the reference keyframe will be the same as or one after that of the
		// last tested frame. Therefore we start by testing the cached index,
		// then step forward to the end, and then start back at zero.
		do {
			next = kf[i + 1];
			if (kf[i].index <= f && (!next || next.index > f)) {
				return me.setPrivate(CACHE_LAST_KF_IDX, i);
			}
			i++;
			if(i === len) {
				i = 0;
			}
		} while(i !== last);
	}
});

})();