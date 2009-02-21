/**
 * @class SVG view for a fill property
 * @extends zomby.view.property.PropertyView
 */
zomby.view.property.svg.FillSvgView = zomby.view.property.PropertyView.extend(
/** @scope zomby.view.property.svg.FillSvgView.prototype */
{
	getDefsElement : function() {
		return this.parentView.getDefsElement();
	},

	update : function() {
		this.base();
		var gv = this.gradientView;
		if(gv) {
			gv.update();
		}
	},

	updateProp : function(name, val) {
		switch(name) {
			case "rule":
			case "opacity":
				this.parentView.setAttribute("fill-" + name, val);
				break;
			case "paint":
				if(val instanceof zomby.model.property.Gradient) {
					var gv = this.gradientView;
					if(!gv) {
						gv = this.gradientView = zomby.view.View.forModelObject(val, this);
					}
					gv.update();
					this.parentView.setAttribute("fill", "url(#" + gv.getId() + ")");
				} else {
					this.parentView.setAttribute("fill", val);
				}
				break;
		}
	}
});