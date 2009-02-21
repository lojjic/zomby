/**
 * @class SVG view for a stroke property
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.StrokeSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.StrokeSvgView.prototype */
{
	updateProp : (function() {
		var propsToAttrs = {
			paint : "stroke",
			width : "stroke-width",
			cap : "stroke-linecap",
			join : "stroke-linejoin",
			miterLimit : "stroke-miterlimit",
			dashOffset : "stroke-dashoffset",
			opacity : "stroke-opacity"
		};

		return function(name, val) {
			switch(name) {
				case "dashArray":
					this.parentView.setAttribute("stroke-dasharray", val ? val.join(',') : null);
					break;
				default:
					var attr = propsToAttrs[name];
					if(attr) {
						this.parentView.setAttribute(attr, val);
					}
			}
		};
	})()
});