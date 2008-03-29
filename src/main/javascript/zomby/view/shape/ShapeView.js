

Package("zomby.view.shape").ShapeView = zomby.view.View.extend({

	shape : null,
	selected : false,

	constructor : function(shape, parent) {
		this.shape = shape;
		this.initEventListeners();
		this.base(parent);
		this.update();
	},

	getShape : function() {
		return this.shape;
	},

	initEventListeners : function() {
		this.shape.onpropertychange.subscribe($.rescope(this.handlePropertyChanged, this));
	},

	/**
	 * Update the entire state of the view from the shape.
	 * @abstract
	 */
	update : function() {
		throw new Error("Not Implemented: ShapeView.update()");
	},

	handlePropertyChanged : function(e) {
		throw new Error("Not Implemented: ShapeView.handlePropertyChanged(e)");
	},

	select : function() {
		this.selected = true;
		this.getElement().addClass("selected");
	},

	deselect : function() {
		this.selected = false;
		this.getElement().removeClass("selected");
	},

	isSelected : function() {
		return this.selected;
	}

});