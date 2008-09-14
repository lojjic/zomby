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
		var m = this.modelObject;
		this.setAttributes({
			x : m.x,
			y : m.y,
			width : m.width,
			height : m.height
		});
	}
}, {
	MODEL_CLASS : zomby.model.shape.Rectangle
});