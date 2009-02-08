
zomby.view.svg.TimelineSvgView = zomby.view.svg.SvgView.extend({

	shapeView : null,

	constructor : function(timeline, parent) {
		this.base(timeline, parent);
		this.layerViews = [];
		zomby.Util.each(timeline.layers, function(lyr) {
			var v = new zomby.view.svg.LayerSvgView(lyr, this);
			this.layerViews.push(v);
			v.appendTo(this.getElement());
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
		var props = this.getChanges(), p;

		p = "width";
		if(p in props) {
			this.getElement().setAttribute(p, props[p]);
		}
		p = "height";
		if(p in props) {
			this.getElement().setAttribute(p, props[p]);
		}

		zomby.Util.each(this.layerViews, function(view) {
			view.update();
		});
	}
}, {
	MODEL_CLASS : zomby.model.Timeline
});