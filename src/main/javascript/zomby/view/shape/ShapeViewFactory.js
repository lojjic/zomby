Package("zomby.view.shape");

/**
 * @class A factory for creating {@link zomby.view.shape.ShapeView} objects.
 */
zomby.view.shape.ShapeViewFactory = Base.extend(
/** @scope zomby.view.shape.ShapeViewFactory.prototype */
{
	/**
	 * Create and return an appropriate ShapeView for the given Shape
	 * @param {Shape} shape The Shape to wrap
	 * @param {Element} parent The parent element for the ShapeView
	 * @return A {@link zomby.view.shape.ShapeView} object wrapping the given shape
	 * @type zomby.view.shape.ShapeView
	 */
	getShapeView : function(shape, parent) {
		var viewClass = this.getClassForType(shape.getType());
		return new viewClass(shape, parent);
	},

	/**
	 * Get the appropriate {@link zomby.view.shape.ShapeView} class constructor
	 * object for a given {@link zomby.model.shape.Shape} object.  Subclasses can
	 * override this to provide alternate mappings.
	 * @param {String} type The type of the Shape object; corresponds to the value
	 *        returned by {@link zomby.model.shape.Shape#getType()}.
	 * @return The appropriate {@link zomby.view.shape.ShapeView} class constructor, or
	 *         null if no appropriate class was found.
	 * @type Function
	 */
	getClassForType : function(type) {
		return {
			ellipse : zomby.view.shape.svg.EllipseSvgView,
			rectangle : zomby.view.shape.svg.RectangleSvgView,
			line : zomby.view.shape.svg.LineSvgView
		}[type] || null;
	}
});