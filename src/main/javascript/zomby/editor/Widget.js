

Package("zomby.editor").Widget = Base.extend({

	/**
	 * @constructor
	 * @param {HTMLElement|jQuery} parent The parent element into which the widget will be inserted
	 */
	constructor : function(parent) {
		this.getElement().appendTo(parent);
	},
	
	/**
	 * Create the element for the widget. Must be implemented by
	 * concrete subclasses.
	 * @abstract
	 * @return The topmost element for the widget
	 * @type jQuery
	 */
	create : function() {
		throw new Error("Not Implemented");
	},
	
	/**
	 * Get the widget's element
	 * @return the widget's element
	 * @type jQuery
	 */
	getElement : function() {
		return this.element || (this.element = this.create());
	},
	
	/**
	 * Destroy the widget, removing it from the DOM
	 */
	destroy : function() {
		this.getElement().remove();
	}

});