Package("zomby.view.shape");

/**
 * @class A view of an Ellipse
 * @extends zomby.view.shape.ShapeView
 */
zomby.view.shape.EllipseView = zomby.view.shape.ShapeView.extend(
/** @scope zomby.view.shape.EllipseView.prototype */
{
	/**
	 * Create the view element for the ellipse.
	 * @type jQuery
	 */
	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "ellipse");
	},

	/**
	 * Handle a 'propertychange' event fired by this view's shape
	 * @event propertychange
	 * @param {zomby.model.PropertyChangeEventData} e The event data object
	 */
	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "radius":
			case "position":
				this.updateRadiusAndPosition();
				break;
		}
	},

	/**
	 * Update the view to match all aspects of its Ellipse object
	 */
	update : function() {
		this.updateRadiusAndPosition();
	},

	/**
	 * Update the view to match its shape's current x/y-radius and position
	 */
	updateRadiusAndPosition : function() {
		var s = this.getShape(),
			p = s.getPosition();
		this.getElement().attr({
			cx : p.x,
			cy : p.y,
			rx : s.getWidth() / 2,
			ry : s.getHeight() / 2
		});
	}

});