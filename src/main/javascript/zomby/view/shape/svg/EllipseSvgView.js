/**
 * @class A SVG based view of an Ellipse
 * @extends zomby.view.shape.svg.ShapeSvgView
 */
zomby.view.shape.svg.EllipseSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.EllipseSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Ellipse object
	 */
	update : function() {
		this.base();
		var props = this.getChanges(), p;
		p = "xRadius";
		if(p in props) {
			this.setAttribute("rx", props[p]);
		}
		p = "yRadius";
		if(p in props) {
			this.setAttribute("ry", props[p]);
		}
	}
}, {
	TAG : "ellipse",
	MODEL_CLASS : zomby.model.shape.Ellipse
});