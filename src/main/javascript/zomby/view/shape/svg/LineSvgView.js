/**
 * @class A SVG based view of a Line
 * @extends zomby.view.shape.svg.StrokeableSvgView
 */
zomby.view.shape.svg.LineSvgView = zomby.view.shape.svg.StrokeableSvgView.extend(
/** @scope zomby.view.shape.svg.LineSvgView.prototype */
{
	updateProp : function(name, val) {
		var m;
		this.base(name, val);
		switch(name) {
			case "x":
			case "xEnd":
				m = this.modelObject;
				this.setAttribute("x2", m.xEnd - m.x);
				break;
			case "y":
			case "yEnd":
				m = this.modelObject;
				this.setAttribute("y2", m.yEnd - m.y);
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
