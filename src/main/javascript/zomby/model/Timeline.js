/**
 * @class Animation timeline.
 *
 * @constructor
 */
zomby.model.Timeline = zomby.model.ModelObject.extend(
/** @scope zomby.model.Timeline.prototype */
{
	frame : 0,
	fps: 10,
	length : 100,
	loop : false,
	library : null,
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
	 * Sync all layers to the current frame
	 */
	sync : function() {
		zomby.Util.each(this.layers, function(lyr) {
			lyr.go(this.frame + lyr.startFrame);
		}, this);
	}
});