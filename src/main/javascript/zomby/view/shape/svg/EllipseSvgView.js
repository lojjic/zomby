/**
 * @class A SVG based view of an Ellipse
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.EllipseSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.EllipseSvgView.prototype */
{
	/**
	 * Create the view element for the ellipse.
	 * @type Element
	 */
	create : function() {
		return this.createSVG("ellipse");
	},

	/**
	 * Update the view to match all aspects of its Ellipse object
	 */
	update : function() {
		this.base();
		var m = this.modelObject;
		this.setAttributes({
			cx : m.x,
			cy : m.y,
			rx : m.xRadius,
			ry : m.yRadius
		});
	}
}, {
	MODEL_CLASS : zomby.model.shape.Ellipse
});