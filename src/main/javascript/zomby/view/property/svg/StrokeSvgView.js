/**
 * @class SVG view for a stroke property
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.StrokeSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.StrokeSvgView.prototype */
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
			"stroke-dasharray" : m.dashArray ? m.dashArray.join(',') : null,
			"stroke-dashoffset" : m.dashOffset,
			"stroke-opacity" : m.opacity
		});
	}
});