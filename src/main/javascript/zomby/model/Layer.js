/**
 * @class Layer of a timeline.
 *
 * @constructor
 */
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
			cache = "_realShape",
			s = me[cache];
		if( !s ) {
			s = me[cache] = me.getInitialShape().clone();
		}
		return s;
	},

	getInitialShape: function() {
		var me = this,
			cache = "_initialShape",
			s = me[cache];
		if(!s) {
			s = me.shape;
			if(typeof s == "string" && s.indexOf("lib:") == 0) {
				s = s.substring(4);
				s = me[cache] = me.timeline.library.get(s);
			}
		}
		return s;
	},

	/**
	 * Sync the given {@link zomby.model.shape.Shape}'s properties to the current frame
	 */
	sync : function() {
		var me = this,
			propsCache = "_lastKfProps",
			kf = me.keyframes,
			lastKfIdx = me._lastRefKfIdx,
			kfIdx = me.getReferenceKeyframeIndex(),
			prev = kf[kfIdx],
			next,
			s = me.getShape(),
			tl = me.timeline,
			canUseOnlyNextKfProps = false, //if we know the only changes are the next keyframe's props, don't have to iterate over all of them
			props, kfProps, p;

		// Find the full set of shape properties for the reference keyframe.
		// First we see if we have a cached set of values, and if it is for
		// the same keyframe then use it directly.
		if(lastKfIdx == kfIdx) {
			props = me[propsCache];
			canUseOnlyNextKfProps = true;
		}
		// If we're just one keyframe after the cached one, then use it but
		// add in the new keyframe's properties
		else if(lastKfIdx == kfIdx - 1) {
			props = me[propsCache];
			kfProps = prev.properties;
			for(p in kfProps) {
				props[p] = kfProps[p];
			}
			me[propsCache] = props;
			canUseOnlyNextKfProps = true;
		}
		else {
			// Not cached; rebuild by walking back through the previous keyframes
			// and collecting the most recently declared property values.
			props = me[propsCache] = {};
			for(var i=kfIdx; i>=0; i--) {
				kfProps = kf[i].properties;
				if(kfProps) {
					for(p in kfProps) {
						if(!(p in props)) {
							props[p] = kfProps[p];
						}
					}
				}
			}
			var init = me.getInitialShape();
			zomby.Util.each(init.getPropertyNames(), function(p) {
				if(!(p in props)) {
					props[p] = init[p];
				}
			});
		}

		// Current frame is keyframe; copy shape properties directly, and execute any listeners:
		if(prev.index == me.frame) {
			prev.doOnEnter(tl, me);
			for(p in props) {
				s[p] = props[p];
			}
			prev.doOnExit(tl, me);
		}
		// In between tweened keyframes; calculate the tweened numeric values and copy the rest directly:
		else if(next = kf[kfIdx + 1]) {
			var nextProps = next.properties,
				easing = zomby.anim.Easing[next.easing || "linear"],
				curFrame = me.frame - prev.index,
				totFrames = next.index - prev.index;
			for(p in (canUseOnlyNextKfProps ? nextProps : props)) {
				if(nextProps && next.tween && p in nextProps && typeof props[p] == "number" && typeof nextProps[p] == "number") {
					s[p] = easing(curFrame, props[p], nextProps[p] - props[p], totFrames);
				} else {
					s[p] = props[p];
				}
			}
		}
	},

	/**
	 * Find the index of the reference Keyframe for the current frame,
	 * i.e. the one that is either equal to the current frame or the
	 * most recent one.
	 */
	getReferenceKeyframeIndex: function() {
		var me = this,
			kf = me.keyframes,
			f = me.frame,
			cache = '_lastRefKfIdx',
			last = me[cache] || 0,
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
				return me[cache] = i;
			}
			i++;
			if(i == len) {
				i = 0;
			}
		} while(i != last);
	}

});