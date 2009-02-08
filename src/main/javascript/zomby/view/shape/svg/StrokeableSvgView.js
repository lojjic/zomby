/**
 * @abstract
 * @class A SVG based view of a Strokeable shape
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.StrokeableSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
/** @scope zomby.view.shape.svg.StrokeableSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its stroke property
	 */
	update : function() {
		this.base();
		(this.strokeView || (this.strokeView = new zomby.view.property.svg.StrokeSvgView(this.modelObject.stroke, this))).update();
	}
});
