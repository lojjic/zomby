/**
 * @class A SVG based view of a Line
 * @extends zomby.view.shape.svg.StrokeableSvgView
 */
zomby.view.shape.svg.LineSvgView = zomby.view.shape.svg.StrokeableSvgView.extend(
/** @scope zomby.view.shape.svg.LineSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		this.base();
		var line = this.modelObject;
		this.setAttributes({
			x1 : 0,
			y1 : 0,
			x2 : line.xEnd - line.x,
			y2 : line.yEnd - line.y
		});
	}
}, {
	TAG : "line",
	MODEL_CLASS : zomby.model.shape.Line
});
