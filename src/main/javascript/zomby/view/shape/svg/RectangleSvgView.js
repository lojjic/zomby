/**
 * @class A SVG based view for a Rectangle
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.RectangleSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.RectangleSvgView.prototype */
{

	updateProp : function(name, val) {
		this.base(name, val);
		switch(name) {
			case "width":
			case "height":
				this.setAttribute(name, val);
		}
	}

}, {
	TAG : "rect",
	MODEL_CLASS : zomby.model.shape.Rectangle
});