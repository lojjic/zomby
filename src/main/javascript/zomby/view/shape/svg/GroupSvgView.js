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
		for(var s = group.shapes, i = 0, len = s.length; i < len; i++) {
			this.shapeViews.push(zomby.view.View.forModelObject(s[i], this));
		}
	},

	/**
	 * Create the view element for the Group.
	 */
	create : function() {
		return this.createSVG("g");
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		for(var i=0; i<this.shapeViews.length; i++) {
			this.shapeViews[i].update();
		}
	}
}, {
	MODEL_CLASS : zomby.model.shape.Group
});