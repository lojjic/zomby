
zomby.view.svg.LayerSvgView = zomby.view.svg.SvgView.extend({

	shapeView : null,

	constructor : function(layer, parent) {
		this.base(layer, parent);
		this.shapeView = zomby.view.View.forModelObject(layer.shape, this);
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
		this.base();
		this.shapeView.update();
	}
}, {
	MODEL_CLASS : zomby.model.Layer
});