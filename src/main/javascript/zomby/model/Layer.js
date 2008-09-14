/**
 * @class Layer of a timeline.
 *
 * @constructor
 */
zomby.model.Layer = Base.extend(
/** @scope zomby.model.Layer.prototype */
{
	frame : 0,
	startFrame : 0,
	endFrame : 100,
	shape : null,

	constructor : function() {
		/**
		 * @type Array<zomby.model.Keyframe>
		 */
		this.keyframes = [];
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
	 * Sync the given {@link zomby.model.shape.Shape}'s properties to the current frame
	 */
	sync : function() {
		var kf = this.getPrevNextKeyframes(),
			s = this.shape,
			props, p;
		// Current frame is keyframe; copy shape properties directly:
		if(kf[0].index == this.frame) {
			props = kf[0].properties;
			for(p in props) {
				s[p] = props[p];
			}
		}
		// In between tweened keyframes; calculate the tweened numeric values and copy the rest directly:
		else if(kf[1]) {
			props = kf[1].properties;
			var easing = zomby.anim.Easing[kf[1].easing || "linear"],
				oldProps = kf[0].properties,
				curFrame = this.frame - kf[0].frame,
				totFrames = kf[1].frame - kf[0].frame;
			for(p in props) {
				if(kf[1].tween && typeof props[p] == "number") {
					s[p] = easing(curFrame, oldProps[p], props[p], totFrames);
				} else {
					s[p] = oldProps[p];
				}
			}
		}
	},

	/**
	 * Get the previous/current and next keyframes
	 */
	getPrevNextKeyframes : function() {
		var last = this._lastPrevNext, f = this.frame;
		if(last && last[0].index <= f && last[1] > f) {
			return last;
		}
		for(var i=0, len=this.keyframes.length; i<len; i++) {
			var prev = this.keyframes[i],
				next = this.keyframes[i + 1];
			if(prev.index <= f && next.index > f) {
				return this._lastPrevNext = [prev, next];
			}
		}
	}
});