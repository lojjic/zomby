
zomby.view.svg.LayerSvgView = zomby.view.svg.SvgView.extend({

	shapeViews : null,

	constructor : function(layer, parent) {
		this.base(layer, parent);
		var shapeViews = this.shapeViews = [],
			el = this.getElement(),
			i, len;
		for(i = 0, len = layer.shapes.length; i < len; i++) {
			var v = zomby.view.View.forModelObject(layer.getShape(i), this);
			v.appendTo(el);
			shapeViews.push(v);
		}
	},

	/**
	 * Create the view element for this view's Layer.
	 * @type Element
	 */
	create : function() {
		return this.createSVG("g");
	},

	/**
	 * Update the view to match all aspects of its Layer object
	 */
	update : function() {
		// doesn't need to call super since doesn't use changes
		zomby.Util.each(this.shapeViews, function(view) {
			view.update();
		});
	}
}, {
	MODEL_CLASS : zomby.model.Layer
});