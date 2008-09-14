/**
 * @class Abstract base class for Element-based views
 * @extends zomby.view.View
 *
 * @constructor
 * @param {zomby.model.ModelObject} modelObject The model object for which the view will be rendered
 * @param {Element} parent
 */
zomby.view.ElementView = zomby.view.View.extend(
/** @scope zomby.view.ElementView.prototype */
{
	constructor : function(modelObject, parent) {
		this.base(modelObject, parent);
		var el = parent && parent.getElement();
		if(el) {
			this.appendTo(el);
		}
	},

	/**
	 * Create the element for the view. Must be implemented by
	 * concrete subclasses.
	 * @abstract
	 * @return The topmost element for the view
	 * @type Element
	 */
	create : function() {
		throw new Error("Not Implemented: ElementView.create()");
	},

	/**
	 * Get the view's element
	 * @return the view's element
	 * @type Element
	 */
	getElement : function() {
		return this._element || (this._element = this.create());
	},

	/**
	 * Append this view's element into the given element
	 * @param {Element} el The target element
	 */
	appendTo : function(el) {
		el.appendChild(this.getElement());
	},

	/**
	 * Copy the given object's properties onto the element as attributes
	 * @param {Object} attrs
	 */
	setAttributes : function(attrs) {
		for(var a in attrs) {
			this.getElement().setAttribute(a, attrs[a]);
		}
	},

	/**
	 * Destroy the view, removing it from the DOM
	 */
	destroy : function() {
		var el = this._element;
		if(el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
		this._element = null;
	}
});