/**
 * @class Abstract base class for SVG views of shapes
 * @extends zomby.view.svg.SvgView
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.svg.SvgView.extend({
	constructor : function(shape, parent) {
		this.base(shape, parent);
		this.transformView = new zomby.view.shape.property.svg.TransformSvgView(shape.transform, this);
	},

	update : function() {
		this.base();
		this.transformView.update();
	}
});