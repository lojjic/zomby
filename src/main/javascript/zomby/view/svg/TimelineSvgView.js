
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
	update : (function() {
		function updateView(view) {
			view.update();
		}

		return function() {
			this.base();
			zomby.Util.each(this.layerViews, updateView);
		};
	})(),

	updateProp : function(name, val) {
		switch(name) {
			case "width":
			case "height":
				this.getElement().setAttribute(name, val);
		}
	}
}, {
	MODEL_CLASS : zomby.model.Timeline
});