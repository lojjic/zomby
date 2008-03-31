

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

	// TODO move these selection methods into a subclass/wrapper in the editor package

	select : function() {
		if(!this.selected) {
			this.selected = true;
			var box = this.selectionBox = new zomby.editor.ui.toolbox.SelectionBox(this.getElement().parent().parent());
			box.setBounds(this.getShape().getBounds());
			box.onchange.subscribe($.rescope(this.handleSelectionBoxChange, this));
		}
	},

	deselect : function() {
		if(this.selected) {
			this.selected = false;
			this.selectionBox.destroy();
		}
	},

	isSelected : function() {
		return this.selected;
	},

	handleSelectionBoxChange : function() {
		var box = this.selectionBox;
	}

});