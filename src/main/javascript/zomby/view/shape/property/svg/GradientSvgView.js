/**
 * @class SVG view for a gradient definition
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.GradientSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.GradientSvgView.prototype */
{
	getElement : function() {
		var el = this._element;
		if(!el) {
			el = this._element = document.createElementNS(zomby.core.Constants.SVG_NS,
					this.modelObject.style == 'radial' ? "radialGradient" : "linearGradient");
			el.setAttribute("id", this.getId());
			this.parentView.getDefsElement().appendChild(el);
		}
		return el;
	},

	getId : function() {
		return zomby.core.Util.generateId(this);
	},

	update : function() {
		var el = this.getElement(),
			m = this.modelObject,
			stop, stopEl;
		for(var i=0, len=m.stops.length; i<len; i++) {
			// reuse existing stop elements if available
			stop = m.stops[i],
			stopEl = el.childNodes[i];
			if(!stopEl) {
				stopEl = document.createElementNS(zomby.core.Constants.SVG_NS, "stop");
				el.appendChild(stopEl);
			}
			stopEl.setAttribute("offset", stop.offset);
			stopEl.setAttribute("stop-color", stop.color);
			stopEl.setAttribute("stop-opacity", stop.opacity);
		}
		// remove any additional stop elements from previous renderings
		while(stopEl = el.childNodes[i]) {
			el.removeChild(stopEl);
		}
	}
}, {
	MODEL_CLASS : zomby.model.shape.property.Gradient
});