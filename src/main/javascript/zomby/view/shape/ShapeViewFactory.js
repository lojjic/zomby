

Package("zomby.view.shape").ShapeViewFactory = Base.extend({

	/**
	 * Create and return an appropriate ShapeView for the given Shape
	 * @param {Shape} shape The Shape to wrap
	 * @param {Element} parent The parent element for the ShapeView
	 * @return The ShapeView
	 * @type ShapeView
	 */
	getShapeView : function(shape, parent) {
		var viewClass = this.getClassForType(shape.getType());
		return new viewClass(shape, parent);
	},

	getClassForType : function(type) {
		return {
			ellipse : zomby.view.shape.EllipseView,
			rectangle : zomby.view.shape.RectangleView,
			line : zomby.view.shape.LineView
		}[type];
	}

});