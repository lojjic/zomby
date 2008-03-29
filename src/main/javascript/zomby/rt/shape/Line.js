
Package("zomby.rt.shape").Line = zomby.rt.shape.Shape.extend({

	start : {x:0, y:0},
	end : {x:0, y:0},

	getStart : function() {
		return this.start;
	},

	setStart : function(x, y) {
		this._setProperty("start", {x:x, y:y});
	},

	getEnd : function() {
		return this.end;
	},

	setEnd : function(x, y) {
		this._setProperty("end", {x:x, y:y});
	},

	getBounds : function() {
		var s = this.start,
			e = this.end,
			p = this.getPosition();
		return [
			Math.min(p.x + s.x, p.x + e.x),
			Math.min(p.y + s.y, p.y + e.y),
			Math.max(p.x + s.x, p.x + e.x),
			Math.max(p.y + s.y, p.y + e.y)
		];
	}
	
}, { //Static
	TYPE : "line"
});