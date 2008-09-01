/**
 * @class SVG view for a shape transform
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.TransformSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.TransformSvgView.prototype */
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