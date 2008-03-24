
Package("zomby.rt.shape").Rectangle = zomby.rt.shape.Shape.extend({

	width : 0,
	height : 0,

	setWidth : function(width) {
		var old = this.width;
		this.width = width;
		this.propertyChanged("width", old, width);
	},

	setHeight : function(height) {
		var old = this.height;
		this.height = height;
		this.propertyChanged("height", old, height);
	},

	setSize : function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	},

	getBounds : function() {
		var p = this.getPosition();
		return [p.x, p.y, p.x + this.width, p.y + this.height];
	},

	getWidth : function() {
		return this.width;
	},

	getHeight : function() {
		return this.height;
	}
	
}, { //Static
	TYPE : "rectangle"
});