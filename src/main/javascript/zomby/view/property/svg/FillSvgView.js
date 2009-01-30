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
		var v = this.parentView,
			m = this.modelObject,
			gv = this.gradientView,
			attrs = {
				"fill-rule" : m.rule,
				"fill-opacity" : m.opacity
			};
		
		if(m.paint instanceof zomby.model.property.Gradient) {
			if(!gv) {
				gv = this.gradientView = zomby.view.View.forModelObject(m.paint, this);
			}
			gv.update();
			attrs.fill = "url(#" + gv.getId() + ")";
		} else {
			attrs.fill = m.paint;
		}
		v.setAttributes(attrs);
	}
});