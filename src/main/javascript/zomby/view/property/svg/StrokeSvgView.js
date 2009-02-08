/**
 * @class SVG view for a stroke property
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.StrokeSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.StrokeSvgView.prototype */
{
	update : (function() {
		var propsToAttrs = {
			paint : "stroke",
			width : "stroke-width",
			cap : "stroke-linecap",
			join : "stroke-linejoin",
			miterLimit : "stroke-miterlimit",
			dashOffset : "stroke-dashoffset",
			opacity : "stroke-opacity"
		};

		return function() {
			this.base();

			var v = this.parentView,
				props = this.getChanges(),
				p;
			for(p in propsToAttrs) {
				if(p in props) {
					v.setAttribute(propsToAttrs[p], props[p]);
				}
			}

			if("dashArray" in props) {
				v.setAttribute("stroke-dasharray", props.dashArray ? props.dashArray.join(",") : null);
			}
		};
	})()
});