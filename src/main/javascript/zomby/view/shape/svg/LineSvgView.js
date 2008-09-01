/**
 * @class A SVG based view of a Line
 * @extends zomby.view.shape.svg.StrokeableSvgView
 */
zomby.view.shape.svg.LineSvgView = zomby.view.shape.svg.StrokeableSvgView.extend(
/** @scope zomby.view.shape.svg.LineSvgView.prototype */
{
	/**
	 * Create the view element for the Line.
	 * @type Element
	 */
	create : function() {
		return this.createSVG("line");
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		this.base();
		var line = this.getShape(),
			ls = line.getStart(),
			le = line.getEnd();
		this.setAttributes({
			x1 : ls.x,
			y1 : ls.y,
			x2 : le.x,
			y2 : le.y
		});
	}
}, {
	MODEL_CLASS : zomby.model.shape.Line
});
