
zomby.view.svg.TimelineSvgView = zomby.view.svg.SvgView.extend({

	shapeView : null,

	constructor : function(timeline, parent) {
		this.base(timeline, parent);
		this.layerViews = [];
		for(var i=0, lyrs=timeline.layers, len=lyrs.length; i<len; i++) {
			this.layerViews.push(zomby.view.View.forModelObject(lyrs[i], this));
		}
	},

	/**
	 * Create the view element for this view's Timeline.
	 * @type Element
	 */
	create : function() {
		return this.createSVG("svg");
	},

	/**
	 * Update the view to match all aspects of its Timeline object
	 */
	update : function() {
		this.base();
		for(var i=0, lv=this.layerViews, len=lv.length; i<len; i++) {
			lv[i].update();
		}
	}
}, {
	MODEL_CLASS : zomby.model.Timeline
});