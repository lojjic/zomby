
Package("zomby.model.shape").Rectangle = zomby.model.shape.Shape.extend({

	width : 0,
	height : 0,

	getWidth : function() {
		return this.width;
	},

	setWidth : function(width) {
		this._setProperty("width", width);
	},

	getHeight : function() {
		return this.height;
	},

	setHeight : function(height) {
		this._setProperty("height", height);
	},

	setSize : function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	},

	getBounds : function() {
		var p = this.getPosition();
		return [p.x, p.y, p.x + this.width, p.y + this.height];
	}
	
}, { //Static
	TYPE : "rectangle"
});