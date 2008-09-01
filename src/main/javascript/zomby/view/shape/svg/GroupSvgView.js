/**
 * @class SVG view of a group of shapes
 * @extends zomby.view.shape.ShapeView
 */
zomby.view.shape.svg.GroupSvgView = zomby.view.shape.ShapeView.extend(
/** @scope zomby.view.shape.svg.ShapeSvgView.prototype */
{
	shapeViews : null,

	constructor : function(group, parent) {
		this.base(group, parent);
		this.shapeViews = [];
		var s = group.shapes, i = 0;
		while(s.length > i++) {
			this.shapeViews.push(zomby.view.View.forModelObject(s[i], this.getElement()));
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
		this.base();
	}
}, {
	MODEL_CLASS : zomby.model.shape.Group
});