/**
 * @class Animation timeline.
 *
 * @constructor
 */
zomby.model.Timeline = Base.extend(
/** @scope zomby.model.Timeline.prototype */
{
	frame : 0,
	length : 100,
	fps : 10,
	loop : false,

	constructor : function() {
		/**
		 * @type Array<zomby.model.Layer>
		 */
		this.layers = [];
	},

	/**
	 * Advance one frame. When reaching the end of the timeline, it will either loop
	 * back to the beginning if the timeline is set to loop, otherwise the animation
	 * will be stopped.
	 */
	step : function() {
		if(this.frame + 1 >= this.length) {
			if(this.loop) {
				this.go(0);
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
	 * Sync all shapes to the current frame
	 */
	sync : function() {
		var lyr = this.layers;
		for(var i=0; i<lyr.length; i++) {
			lyr[i].go(this.frame + lyr.start);
		}
	},

	/**
	 * Start the timeline playing
	 */
	start : function() {
		if(!this._timer) {
			this._timer = setInterval(zomby.core.Util.rescope(this.step,  this), 1000 / this.fps);
		}
	},

	/**
	 * Stop the timeline playing
	 */
	stop : function() {
		if(this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}
	}
});