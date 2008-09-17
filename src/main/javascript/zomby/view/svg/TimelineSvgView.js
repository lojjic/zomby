
zomby.view.svg.TimelineSvgView = zomby.view.svg.SvgView.extend({

	shapeView : null,

	constructor : function(timeline, parent) {
		this.base(timeline, parent);
		this.layerViews = [];
		zomby.Util.each(timeline.layers, function(lyr) {
			this.layerViews.push(zomby.view.View.forModelObject(lyr, this));
		}, this);
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
		zomby.Util.each(this.layerViews, function(view) {
			view.update();
		})
	}
}, {
	MODEL_CLASS : zomby.model.Timeline
});