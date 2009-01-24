/**
 * @class A keyframe in a timeline layer.
 *
 * @constructor
 */
zomby.model.Keyframe = zomby.model.ModelObject.extend(
/** @scope zomby.model.Keyframe.prototype */
{
	index : 0,
	tween : false,
	easing : "linear",
	properties : null,
	onenter : null,
	onexit : null,

	doOnEnter : function(timeline, layer) {
		if(this.onenter) {
			var cache = '_onenterFunc',
				fn = this[cache];
			if(!fn) {
				fn = this[cache] = new Function("timeline", "layer", this.onenter);
			}
			fn(timeline, layer);
		}
	},

	doOnExit : function(timeline, layer) {
		if(this.onexit) {
			var cache = '_onexitFunc',
				fn = this[cache];
			if(!fn) {
				fn = this[cache] = new Function("timeline", "layer", this.onexit);
			}
			fn(timeline, layer);
		}
	}
});