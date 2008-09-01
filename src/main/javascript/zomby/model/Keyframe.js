/**
 * @class A keyframe in a timeline layer.
 *
 * @constructor
 */
zomby.model.Keyframe = zomby.model.ModelObject.extend(
/** @scope zomby.model.Keyframe.prototype */
{
	index : 0,
	shape : null,
	tween : false,

	setIndex : function(i) {
		this.set("index", i);
	},

	getIndex : function() {
		return this.index;
	},

	setShape : function(s) {
		this.set("shape", s);
	},

	getShape : function() {
		return this.shape;
	},

	setTween : function(t) {
		this.set("tween", t);
	},

	isTween : function() {
		return this.tween;
	}
});