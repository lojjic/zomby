Package("zomby.model");

/**
 * @class A set of shape transformation properties.
 *
 * @constructor
 */
zomby.model.Transform = zomby.model.ModelBase.extend(
/** @scope zomby.model.Transform.prototype */
{
	/**
	 * X-axis scale. 1 == native size.
	 */
	scaleX : 1,

	/**
	 * Y-axis scale. 1 == native size.
	 */
	scaleY : 1,

	/**
	 * Rotation of the shape in degrees
	 */
	rotation : 0,

	/**
	 * Opacity. 0 == fully transparent, 1 == fully opaque
	 */
	opacity : 1,


	/**
	 * Shortcut for setting both scaleX and scaleY to the same value at once.
	 * @param scale
	 */
	setScale : function(s) {
		this.setScaleX(s);
		this.setScaleY(s);
	},

	getScaleX : function() {
		return this.scaleX;
	},

	setScaleX : function(s) {
		this.set("scaleX", s);
	},

	getScaleY : function() {
		return this.scaleY;
	},

	setScaleY : function(s) {
		this.set("scaleY", s);
	},

	getRotation : function() {
		return this.rotation;
	},

	setRotation : function(r) {
		this.set("rotation", r);
	},

	getOpacity : function() {
		return this.opacity;
	},

	setOpacity : function(o) {
		this.set("opacity", Math.min(1, Math.max(0, o)));
	}
});