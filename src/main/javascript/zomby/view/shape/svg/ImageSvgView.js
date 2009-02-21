/**
 * @class A SVG based view for an Image shape
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.ImageSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.ImageSvgView.prototype */
{
	updateProp : function(name, val) {
		this.base(name, val);
		switch(name) {
			case "src":
				this.getElement().setAttributeNS(zomby.Constants.XLINK_NS, "href", val);
				break;
			case "width":
			case "height":
				this.setAttribute(name, val);
		}
	},

	createSVG : function(name) {
		var el = this.base(name);
		el.setAttribute("preserveAspectRatio", "none");
		return el;
	}
}, {
	TAG : "image",
	MODEL_CLASS : zomby.model.shape.Image
});
