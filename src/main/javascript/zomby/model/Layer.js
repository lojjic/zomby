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
		this.base(props);
		this.timeline = timeline;
		this.keyframes = [];
		zomby.Util.each(props.keyframes, function(kf) {
			this.keyframes.push(new zomby.model.Keyframe(kf));
		}, this);

		var s = props.shape;
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
	 * Get the Shape object; if the shape is a reference to a library
	 * object ("lib:shapeid"), dereference it to a clone of that library object.
	 */
	getShape: function() {
		var cache = "_realShape",
			s = this[cache];
		if( !s ) {
			s = this[cache] = this.getInitialShape().clone();
		}
		return s;
	},

	getInitialShape: function() {
		var cache = "_initialShape",
			s = this[cache];
		if(!s) {
			s = this.shape;
			if(typeof s == "string" && s.indexOf("lib:") == 0) {
				s = s.substring(4);
				s = this[cache] = this.timeline.library.get(s);
			}
		}
		return s;
	},

	/**
	 * Sync the given {@link zomby.model.shape.Shape}'s properties to the current frame
	 */
	sync : function() {
		var kf = this.keyframes,
			kfIdx = this.getCurrentKeyframeIndex(),
			prev = kf[kfIdx],
			next = kf[kfIdx + 1],
			s = this.getShape(),
			tl = this.timeline,
			props = {}, kfProps, p;

		// Find the full set of shape properties for the reference keyframe
		// by walking back through the previous keyframes and collecting the
		// most recently declared property values.
		for(var i=kfIdx; i>=0; i--) {
			if(kfProps = kf[i].properties) {
				for(p in kfProps) {
					if(!(p in props)) {
						props[p] = kfProps[p];
					}
				}
			}
		}
		var init = this.getInitialShape();
		zomby.Util.each(init.getPropertyNames(), function(p) {
			if(!(p in props)) {
				props[p] = init[p];
			}
		});

		// Current frame is keyframe; copy shape properties directly, and execute any listeners:
		if(prev.index == this.frame) {
			prev.doOnEnter(tl, this);
			for(p in props) {
				s[p] = props[p];
			}
			prev.doOnExit(tl, this);
		}
		// In between tweened keyframes; calculate the tweened numeric values and copy the rest directly:
		else if(next) {
			var nextProps = next.properties;
			if(nextProps) {
				var easing = zomby.anim.Easing[next.easing || "linear"],
					curFrame = this.frame - prev.index,
					totFrames = next.index - prev.index;
				for(p in nextProps) {
					if(next.tween && typeof props[p] == "number") {
						s[p] = easing(curFrame, props[p], nextProps[p], totFrames);
					} else {
						s[p] = props[p];
					}
				}
			}
		}
	},

	getCurrentKeyframeIndex: function() {
		// TODO optimize w/caching, binary search, etc.
		var kf = this.keyframes,
			f = this.frame,
			prev, next;
		for(var i=0, len=kf.length; i<len; i++) {
			prev = kf[i];
			next = kf[i + 1];
			if(prev.index <= f && (!next || next.index > f)) {
				return i;
			}
		}
	}

});