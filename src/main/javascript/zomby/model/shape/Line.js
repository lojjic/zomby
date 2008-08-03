
Package("zomby.model.shape").Line = zomby.model.shape.Shape.extend({

	start : {x:0, y:0},
	end : {x:0, y:0},

	/**
	 * For Lines, we redefine the meaning of setPosition() so that it sets the
	 * position of {start} to the given x/y, and then changes the {end} point so
	 * that it remains at the same position relative to {start} as before. 
	 * @override
	 */
	setPosition : function(x, y) {
		this.base(x, y);
		var s = this.start,
			e = this.end;
		this.setStart(x, y);
		this.setEnd(x + (e.x - s.x), y + (e.y - s.y));
	},

	getStart : function() {
		return this.start;
	},

	setStart : function(x, y) {
		this.set("start", {x:x, y:y});
	},

	getEnd : function() {
		return this.end;
	},

	setEnd : function(x, y) {
		this.set("end", {x:x, y:y});
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