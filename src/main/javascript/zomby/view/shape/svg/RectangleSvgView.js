/**
 * @class A SVG based view for a Rectangle
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.RectangleSvgView = zomby.view.shape.svg.FillableSvgView.extend(
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
		this.base();
		var s = this.getShape();
		this.setAttributes({
			x : s.x,
			y : s.y,
			width : s.width,
			height : s.height
		});
	}
}, {
	MODEL_CLASS : zomby.model.shape.Rectangle
});