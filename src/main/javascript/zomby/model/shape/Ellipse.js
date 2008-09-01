zomby.model.shape.Ellipse = zomby.model.shape.Fillable.extend({

	xRadius : 0,
	yRadius : 0,

	getBounds : function() {
		var t = this;
		return [t.x - t.xRadius, t.y - t.yRadius, t.x + t.xRadius, t.y + t.yRadius];
	}
	
}, { //Static
	TYPE : "ellipse"
});