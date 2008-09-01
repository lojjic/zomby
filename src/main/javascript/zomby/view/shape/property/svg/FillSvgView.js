/**
 * @class SVG view for a fill property
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.FillSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.FillSvgView.prototype */
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