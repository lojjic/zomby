/**
 * @class A SVG based view for an Image shape
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.ImageSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.ImageSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Image object
	 */
	update : function() {
		this.base();
		var props = this.getChanges(), p;

		p = "src";
		if(p in props) {
			this.getElement().setAttributeNS(zomby.Constants.XLINK_NS, "href", props[p]);
		}
		p = "width";
		if(p in props) {
			this.setAttribute(p, props[p]);
		}
		p = "height";
		if(p in props) {
			this.setAttribute(p, props[p]);
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
