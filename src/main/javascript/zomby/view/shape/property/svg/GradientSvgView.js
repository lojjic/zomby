/**
 * @class SVG view for a gradient definition
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.GradientSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.GradientSvgView.prototype */
{
	update : function() {
		var v = this.parentView,
			m = this.modelObject;
		v.setAttributes({
			fill : m.paint,
			"fill-rule" : m.rule,
			"fill-opacity" : m.opacity
		});
	}
});