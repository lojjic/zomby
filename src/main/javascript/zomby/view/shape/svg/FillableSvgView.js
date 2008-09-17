/**
 * @abstract
 * @class A SVG based view of a Fillable shape
 * @extends zomby.view.shape.svg.StrokeableSvgView
 */
zomby.view.shape.svg.FillableSvgView = zomby.view.shape.svg.StrokeableSvgView.extend(
/** @scope zomby.view.shape.svg.FillableSvgView.prototype */
{
	constructor : function(shape, parent) {
		this.base(shape, parent);
		this.fillView = new zomby.view.property.svg.FillSvgView(shape.fill, this);
	},

	/**
	 * Update the view to match all aspects of its Fillable object
	 */
	update : function() {
		this.base();
		this.fillView.update();
	}
});
