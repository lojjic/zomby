Package("zomby.model");

/**
 * @class Layer of a timeline.
 *
 * @constructor
 */
zomby.model.Layer = Base.extend(
/** @scope zomby.model.Layer.prototype */
{
	frame : 0,
	start : 0,
	zIndex : 0,
	length : 100,

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
	sync : function(shape) {
		var kf = this.getPrevNextKeyframes();
		// Current frame is keyframe; copy shape properties directly:
		if(kf[0].getIndex() == this.frame) {
			var kfShape = kf[0].getShape();
			for(var p in kfShape) {
				if(typeof kfShape[p] != "function" && p != "type") {
					shape.set(p, kfShape[p]);
				}
			}
		}
		else if(kf[0].isTween()) {
			
		}
	},

	/**
	 * Get the previous/current and next keyframes
	 * 
	 */
	getPrevNextKeyframes : function() {
		// TODO replace with a faster algorithm and/or indexing and/or caching
		for(var i=0; i<this.keyframes.length; i++) {
			var prev = this.keyframes[i],
				next = this.keyframes[i + 1];
			if(prev.getIndex() <= this.frame && next.getIndex() > this.frame) {
				return [prev, next];
			}
		}
	}
});