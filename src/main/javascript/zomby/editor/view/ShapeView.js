

Package("zomby.editor.view").ShapeView = zomby.editor.Widget.extend({

	shape : null,
	selected : false,

	constructor : function(shape, parent) {
		this.shape = shape;
		this.initEventListeners();
		this.base(parent);
	},

	getShape : function() {
		return this.shape;
	},

	initEventListeners : function() {
		this.shape.onpropertychange.subscribe($.rescope(this.handlePropertyChange, this));
	},

	handlePropertyChange : function(e) {
		if(e.name == "position") {
			this.getElement().css({left:e.newValue.x, top:e.newValue.y});
		}
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