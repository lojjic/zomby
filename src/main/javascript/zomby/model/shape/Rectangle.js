zomby.model.shape.Rectangle = zomby.model.shape.Fillable.extend({

	width : 0,
	height : 0,

	getBounds : function() {
		var t = this;
		return [t.x, t.y, t.x + t.width, t.y + t.height];
	}
	
}, { //Static
	TYPE : "rectangle"
});