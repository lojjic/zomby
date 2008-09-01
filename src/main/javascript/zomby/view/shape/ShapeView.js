/**
 * @class Abstract base class for views of shapes
 * @extends zomby.view.View
 *
 * @constructor
 * @param {zomby.model.shape.Shape} shape The Shape object for which the view will be rendered
 * @param {Element} parent The parent element into which the view element will be appended
 */
zomby.view.shape.ShapeView = zomby.view.View.extend(
/** @scope zomby.view.shape.ShapeView.prototype */
{
	shape : null,
	selected : false,

	constructor : function(shape, parent) {
		this.base(shape, parent);
		parent.getElement().appendChild(this.getElement());
	},

	/**
	 * Create the element for the view. Must be implemented by
	 * concrete subclasses.
	 * @abstract
	 * @return The topmost element for the view
	 * @type Element
	 */
	create : function() {
		throw new Error("Not Implemented: View.create()");
	},

	/**
	 * Get the view's element
	 * @return the view's element
	 * @type Element
	 */
	getElement : function() {
		return this.element || (this.element = this.create());
	},

	/**
	 * Destroy the view, removing it from the DOM
	 */
	destroy : function() {
		this.getElement().remove();
	}

});