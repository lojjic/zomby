Package("zomby.view");

/**
 * @class A view of a model object.
 * 
 * @constructor
 * @param {Element|jQuery} parent The parent element into which this view's element will be inserted
 */
zomby.view.View = Base.extend(
/** @scope zomby.view.View.prototype */
{
	constructor : function(parent) {
		this.getElement().appendTo(parent);
	},

	/**
	 * (Abstract) Create the element for the view. Must be implemented by
	 * concrete subclasses.
	 * @abstract
	 * @return The topmost element for the view
	 * @type jQuery
	 */
	create : function() {
		throw new Error("Not Implemented: View.create()");
	},

	/**
	 * Get the view's element
	 * @return the view's element
	 * @type jQuery
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