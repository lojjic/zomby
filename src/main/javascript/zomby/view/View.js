

Package("zomby.view").View = Base.extend({

	/**
	 * @constructor
	 * @param {HTMLElement|jQuery} parent The parent element into which this view's element will be inserted
	 */
	constructor : function(parent) {
		this.getElement().appendTo(parent);
	},

	/**
	 * Create the element for the view. Must be implemented by
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