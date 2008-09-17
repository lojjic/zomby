/**
 * @abstract
 * @class A SVG based view of a Strokeable shape
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.StrokeableSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
/** @scope zomby.view.shape.svg.StrokeableSvgView.prototype */
{
	constructor : function(shape, parent) {
		this.base(shape, parent);
		this.strokeView = new zomby.view.property.svg.StrokeSvgView(shape.stroke, this);
	},

	/**
	 * Update the view to match all aspects of its stroke property
	 */
	update : function() {
		this.base();
		this.strokeView.update();
	}
});
