
Package("zomby.model.shape").Ellipse = zomby.model.shape.Shape.extend({

	radius : {x:0, y:0},
	fill : "none",
	stroke : "1px solid #000",

	getRadius : function() {
		return this.radius;
	},

	setRadius : function(rX, rY) {
		this._setProperty("radius", {x:rX, y:rY});
	},

	getFill : function() {
		return this.fill;
	},

	setFill : function(fill) {
		this._setProperty("fill", fill);
	},
	
	getStroke : function() {
		return this.stroke;
	},

	setStroke : function(stroke) {
		this._setProperty("stroke", stroke);
	},

	getBounds : function() {
		var r = this.radius,
			p = this.getPosition();
		return [p.x - r.x, p.y - r.y, p.x + r.x, p.y + r.y];
	}
	
}, { //Static
	TYPE : "ellipse"
});