Package("zomby.view.shape");

/**
 * @class Abstract base class for views of shapes
 * @extends zomby.view.View
 *
 * @constructor
 * @param {zomby.model.shape.Shape} shape The Shape object for which the view will be rendered
 * @param {Element|jQuery} parent
 */
zomby.view.shape.ShapeView = zomby.view.View.extend(
/** @scope zomby.view.shape.ShapeView.prototype */
{
	shape : null,
	selected : false,

	constructor : function(shape, parent) {
		this.shape = shape;
		this.initEventListeners();
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
	 * Initialize event listener(s)
	 */
	initEventListeners : function() {
		this.shape.onpropertychange.subscribe(this.handlePropertyChanged, this);
	},

	/**
	 * Update the entire state of the view from the shape.
	 * Abstract; must be implemented by subclasses.
	 * @abstract
	 */
	update : function() {
		throw new Error("Not Implemented: ShapeView.update()");
	},

	/**
	 * Handle an onpropertychange event. Abstract; must be implemented by subclasses.
	 * @param {zomby.model.PropertyChangeEventData} e The event data
	 */
	handlePropertyChanged : function(e) {
		throw new Error("Not Implemented: ShapeView.handlePropertyChanged(e)");
	},

	/**
	 * Destroy the view, removing its element from the DOM and unsubscribing all event listeners.
	 * @override
	 */
	destroy : function() {
		this.base();
		this.shape.onpropertychange.unsubscribe(this.handlePropertyChanged);
	}

});