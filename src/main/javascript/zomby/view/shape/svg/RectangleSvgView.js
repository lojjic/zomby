Package("zomby.view.shape.svg");

/**
 * @class A SVG based view for a Rectangle
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.RectangleSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
/** @scope zomby.view.shape.svg.RectangleSvgView.prototype */
{
	/**
	 * Create the view element for this view's Rectangle.
	 * @type Element
	 */
	create : function() {
		return this.createSVG("rect");
	},

	/**
	 * Update the view to match all aspects of its Rectangle object
	 */
	update : function() {
		var s = this.getShape();
		this.setAttributes({
			x : s.x,
			y : s.y,
			width : s.width,
			height : s.height
		});
	}
});