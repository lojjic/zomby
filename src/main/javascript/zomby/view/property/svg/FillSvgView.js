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

		var me = this,
			v = me.parentView,
			props = me.getChanges(),
			gv = me.gradientView,
			p;

		p = "rule";
		if(p in props) {
			v.setAttribute("fill-rule", props[p]);
		}

		p = "opacity";
		if(p in props) {
			v.setAttribute("fill-opacity", props[p]);
		}

		p = "paint";
		if(p in props) {
			if(props[p] instanceof zomby.model.property.Gradient) {
				if(!gv) {
					gv = this.gradientView = zomby.view.View.forModelObject(props[p], this);
				}
				gv.update();
				v.setAttribute("fill", "url(#" + gv.getId() + ")");
			} else {
				v.setAttribute("fill", props[p]);
			}
		}
		else if(gv) {
			gv.update();
		}
	}
});