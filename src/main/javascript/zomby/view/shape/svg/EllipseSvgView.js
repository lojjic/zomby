/**
 * @class A SVG based view of an Ellipse
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.EllipseSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.EllipseSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Ellipse object
	 */
	update : function() {
		this.base();
		var m = this.modelObject;
		this.setAttributes({
			rx : m.xRadius,
			ry : m.yRadius
		});
	}
}, {
	TAG : "ellipse",
	MODEL_CLASS : zomby.model.shape.Ellipse
});