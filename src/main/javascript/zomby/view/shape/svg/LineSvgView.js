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
		var changed = this.getChanges(),
			model = this.modelObject;

		if("x" in changed || "xEnd" in changed) {
			this.setAttribute("x2", model.xEnd - model.x);
		}
		if("y" in changed || "yEnd" in changed) {
			this.setAttribute("y2", model.yEnd - model.y);
		}
	},

	createSVG : function(name) {
		var el = this.base(name);
		el.setAttribute("x1", 0);
		el.setAttribute("y1", 0);
		return el;
	}

}, {
	TAG : "line",
	MODEL_CLASS : zomby.model.shape.Line
});
