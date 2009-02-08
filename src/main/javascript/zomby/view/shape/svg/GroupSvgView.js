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
		var el = this.getShapeElement();
		zomby.Util.each(group.shapes, function(shape) {
			var v = zomby.view.View.forModelObject(shape, this);
			this.shapeViews.push(v);
			v.appendTo(el);
		}, this);
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		this.base();
		zomby.Util.each(this.shapeViews, function(view) {
			view.update();
		});
	}
}, {
	TAG : "g",
	MODEL_CLASS : zomby.model.shape.Group
});