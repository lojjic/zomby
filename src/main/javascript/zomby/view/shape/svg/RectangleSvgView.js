/**
 * @class A SVG based view for a Rectangle
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.RectangleSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.RectangleSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Rectangle object
	 */
	update : function() {
		this.base();
		var props = this.getChanges(), p;

		p = "width";
		if(p in props) {
			this.setAttribute(p, props[p]);
		}
		p = "height";
		if(p in props) {
			this.setAttribute(p, props[p]);
		}
	}
}, {
	TAG : "rect",
	MODEL_CLASS : zomby.model.shape.Rectangle
});