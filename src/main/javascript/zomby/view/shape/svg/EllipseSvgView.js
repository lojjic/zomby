/**
 * @class A SVG based view of an Ellipse
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.EllipseSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.EllipseSvgView.prototype */
{

	updateProp : function(name, val) {
		this.base(name, val);
		switch(name) {
			case "xRadius":
				this.setAttribute("rx", val);
				break;
			case "yRadius":
				this.setAttribute("ry", val);
		}
	}

}, {
	TAG : "ellipse",
	MODEL_CLASS : zomby.model.shape.Ellipse
});