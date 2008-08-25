Package("zomby.view.shape");

/**
 * @class Abstract base class for views of shapes
 * @extends zomby.view.View
 *
 * @constructor
 * @param {zomby.model.shape.Shape} shape The Shape object for which the view will be rendered
 * @param {Element} parent
 */
zomby.view.shape.ShapeView = zomby.view.View.extend(
/** @scope zomby.view.shape.ShapeView.prototype */
{
	shape : null,
	selected : false,

	constructor : function(shape, parent) {
		this.shape = shape;
		this.base(parent);
		this.update();
	},

	/**
	 * Get the target {@link zomby.model.shape.Shape} for this view
	 * @type zomby.model.shape.Shape
	 */
	getShape : function() {
		return this.shape;
	},

	/**
	 * Update the entire state of the view from the shape.
	 * Abstract; must be implemented by subclasses.
	 * @abstract
	 */
	update : function() {
		throw new Error("Not Implemented: ShapeView.update()");
	}
});