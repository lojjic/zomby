/**
 * @class SVG view for a shape transform
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.TransformSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.TransformSvgView.prototype */
{
	update : function() {
		var v = this.parentView,
			m = this.modelObject;
		v.setAttributes({
			transform : "scale(" + m.scale + ") rotate(" + m.rotate + ")",
			opacity : m.opacity
		});
	}
});