/**
 * @class A SVG based view for a Rectangle
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.RectangleSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.RectangleSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Rectangle object
	 */
	update : function() {
		this.base();
		var m = this.modelObject;
		this.setAttributes({
			width : m.width,
			height : m.height
		});
	}
}, {
	TAG : "rect",
	MODEL_CLASS : zomby.model.shape.Rectangle
});