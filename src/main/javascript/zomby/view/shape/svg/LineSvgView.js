Package("zomby.view.shape.svg");

/**
 * @class A SVG based view of a Line
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.LineSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
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
		var line = this.getShape(),
			ls = line.getStart(),
			le = line.getEnd();
		this.setAttributes({
			x1 : ls.x,
			y1 : ls.y,
			x2 : le.x,
			y2 : le.y,
			stroke : "#000"
		});
	}
});
