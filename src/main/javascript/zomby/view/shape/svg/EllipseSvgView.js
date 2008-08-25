Package("zomby.view.shape.svg");

/**
 * @class A SVG based view of an Ellipse
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.EllipseSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
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
		var s = this.getShape();
		this.setAttributes({
			cx : s.x,
			cy : s.y,
			rx : s.width / 2,
			ry : s.height / 2
		});
	}
});