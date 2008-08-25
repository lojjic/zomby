
Package("zomby.model.shape").Line = zomby.model.shape.Shape.extend({

	xEnd : 0,
	yEnd : 0,

	getBounds : function() {
		var t = this;
		return [
			Math.min(t.x, t.xEnd),
			Math.min(t.y, t.yEnd),
			Math.max(t.x, t.xEnd),
			Math.max(t.y, t.yEnd)
		];
	}

}, { //Static
	TYPE : "line"
});