/**
 * @class SVG view of a group of shapes
 * @extends zomby.view.shape.ShapeView
 */
zomby.view.shape.svg.GroupSvgView = zomby.view.shape.svg.ShapeSvgView.extend(
/** @scope zomby.view.shape.svg.ShapeSvgView.prototype */
{
	shapeViews : null,

	constructor : function(group, parent) {
		this.base(group, parent);
		this.shapeViews = [];
		var el = this.getElement().firstChild;
		for(var s = group.shapes, i = 0, len = s.length; i < len; i++) {
			var v = zomby.view.View.forModelObject(s[i], this);
			this.shapeViews.push(v);
			v.appendTo(el);
		}
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		for(var i=0, len=this.shapeViews.length; i<len; i++) {
			this.shapeViews[i].update();
		}
	}
}, {
	TAG : "g",
	MODEL_CLASS : zomby.model.shape.Group
});