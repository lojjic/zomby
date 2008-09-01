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
		this.strokeView = new zomby.view.shape.property.svg.StrokeSvgView(shape.stroke, this);
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		this.strokeView.update();
	}
});
