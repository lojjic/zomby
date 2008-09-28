/**
 * @abstract
 * @class A SVG based view of a Fillable shape
 * @extends zomby.view.shape.svg.StrokeableSvgView
 */
zomby.view.shape.svg.FillableSvgView = zomby.view.shape.svg.StrokeableSvgView.extend(
/** @scope zomby.view.shape.svg.FillableSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Fillable object
	 */
	update : function() {
		this.base();
		var f = this.modelObject.fill,
			v = this.fillView || (this.fillView = new zomby.view.property.svg.FillSvgView(f, this));
		v.update();
	}
});
