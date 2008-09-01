/**
 * @class SVG view for a stroke property
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.StrokeSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.StrokeSvgView.prototype */
{
	update : function() {
		var v = this.parentView,
			m = this.modelObject;
		v.setAttributes({
			stroke : m.paint,
			"stroke-width" : m.width,
			"stroke-linecap" : m.cap,
			"stroke-linejoin" : m.join,
			"stroke-miterlimit" : m.miterLimit,
			"stroke-dasharray" : m.dashArray,
			"stroke-dashoffset" : m.dashOffset,
			"stroke-opacity" : m.opacity
		});
	}
});