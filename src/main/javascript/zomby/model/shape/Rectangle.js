
Package("zomby.model.shape").Rectangle = zomby.model.shape.Shape.extend({

	width : 0,
	height : 0,

	getWidth : function() {
		return this.width;
	},

	getHeight : function() {
		return this.height;
	},

	getBounds : function() {
		var t = this;
		return [t.x, t.y, t.x + t.width, t.y + t.height];
	}
	
}, { //Static
	TYPE : "rectangle"
});