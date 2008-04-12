Package("zomby.view.shape");

/**
 * @class A view of a Line
 * @extends zomby.view.shape.ShapeView
 */
zomby.view.shape.LineView = zomby.view.shape.ShapeView.extend(
/** @scope zomby.view.shape.LineView.prototype */
{
	/**
	 * Create the view element for the Line.
	 * @type jQuery
	 */
	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "line");
	},

	/**
	 * Handle a 'propertychange' event fired by this view's Line object
	 * @event propertychange
	 * @param {zomby.model.PropertyChangeEventData} e The event data object
	 */
	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "position":
			case "start":
			case "end":
				this.updateEndPoints();
				break;

			default:
				this.base(e);
		}
	},

	/**
	 * Update the view to match all aspects of its Line object
	 */
	update : function() {
		this.updateEndPoints();
	},

	/**
	 * Update the view to match its Line's end points.
	 */
	updateEndPoints : function() {
		var line = this.getShape(),
			ls = line.getStart(),
			le = line.getEnd();
		this.getElement().attr({
			x1 : ls.x,
			y1 : ls.y,
			x2 : le.x,
			y2 : le.y,
			stroke : "#000"
		});
	}

});
