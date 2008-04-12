Package("zomby.view.shape");

/**
 * @class A view for a Rectangle
 * @extends zomby.view.shape.ShapeView
 */
zomby.view.shape.RectangleView = zomby.view.shape.ShapeView.extend(
/** @scope zomby.view.shape.RectangleView.prototype */
{
	/**
	 * Create the view element for this view's Rectangle.
	 * @type jQuery
	 */
	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "rect");
	},

	/**
	 * Handle a 'propertychange' event fired by this view's Rectangle object
	 * @event propertychange
	 * @param {zomby.model.PropertyChangeEventData} e The event data object
	 */
	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "width":
			case "height":
			case "position":
				this.updateSizeAndPosition();
				break;
		}
	},

	/**
	 * Update the view to match all aspects of its Rectangle object
	 */
	update : function() {
		this.updateSizeAndPosition();
	},

	/**
	 * Update the view to match its Rectangle's position, width, and height.
	 */
	updateSizeAndPosition : function() {
		var s = this.getShape(),
			p = s.getPosition();
		this.getElement().attr({
			x : p.x,
			y : p.y,
			width : s.getWidth(),
			height : s.getHeight()
		});
	}

});