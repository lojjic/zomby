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
		var m = this.modelObject;
		this._shapeElement.setAttributeNS(zomby.core.Constants.XLINK_NS, "href", m.src);
		this.setAttributes({
			width : m.width,
			height : m.height,
			preserveAspectRatio : "none"
		});
	}
}, {
	TAG : "image",
	MODEL_CLASS : zomby.model.shape.Image
});