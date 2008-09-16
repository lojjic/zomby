/**
 * @class SVG view for a fill property
 * @extends zomby.view.shape.property.PropertyView
 */
zomby.view.shape.property.svg.FillSvgView = zomby.view.shape.property.PropertyView.extend(
/** @scope zomby.view.shape.property.svg.FillSvgView.prototype */
{
	constructor : function(fill, parentView) {
		this.base(fill, parentView);
		if(fill.paint instanceof zomby.model.shape.property.Gradient) {
			this.gradientView = zomby.view.View.forModelObject(fill.paint, this);
		}
	},

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
		if(gv) {
			gv.update();
			attrs.fill = "url(#" + gv.getId() + ")";
		} else {
			attrs.fill = m.paint || "none";
		}
		v.setAttributes(attrs);
	}
});