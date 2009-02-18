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
			var CACHE_PROP = '_onenterFunc',
				fn = this.getPrivate(CACHE_PROP);
			if(!fn) {
				fn = new Function("timeline", "layer", this.onenter);
				this.setPrivate(CACHE_PROP, fn);
			}
			fn(timeline, layer);
		}
	},

	doOnExit : function(timeline, layer) {
		if(this.onexit) {
			var CACHE_PROP = '_onexitFunc',
				fn = this.getPrivate(CACHE_PROP);
			if(!fn) {
				fn = new Function("timeline", "layer", this.onexit);
				this.setPrivate(CACHE_PROP, fn);
			}
			fn(timeline, layer);
		}
	}
});