/**
 * @class SVG view for a gradient definition
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.GradientSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.GradientSvgView.prototype */
{
	getElement : function() {
		var el = this._element;
		if(!el) {
			el = this._element = document.createElementNS(zomby.Constants.SVG_NS,
					this.modelObject.style == 'radial' ? "radialGradient" : "linearGradient");
			el.setAttribute("id", this.getId());
			this.parentView.getDefsElement().appendChild(el);
		}
		return el;
	},

	getId : function() {
		return zomby.Util.generateId(this);
	},

	update : function() {
		this.base();
		var el = this.getElement(),
			m = this.modelObject,
			stopEl;
		zomby.Util.each(m.stops, function(stop, i) {
			// reuse existing stop elements if available
			stopEl = el.childNodes[i];
			if(!stopEl) {
				stopEl = document.createElementNS(zomby.Constants.SVG_NS, "stop");
				el.appendChild(stopEl);
			}
			stopEl.setAttribute("offset", stop.offset);
			stopEl.setAttribute("stop-color", stop.color);
			stopEl.setAttribute("stop-opacity", stop.opacity);
		});
		// remove any additional stop elements from previous renderings
		while(stopEl = el.childNodes[m.stops.length]) {
			el.removeChild(stopEl);
		}
	}
}, {
	MODEL_CLASS : zomby.model.property.Gradient
});