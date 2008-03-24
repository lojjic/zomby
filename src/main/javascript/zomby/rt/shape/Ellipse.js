
Package("zomby.rt.shape").Ellipse = zomby.rt.shape.Shape.extend({

	radius : {x:0, y:0},

	setRadius : function(rX, rY) {
		var old = this.radius,
			noo = this.radius = {x:rX, y:rY};
		this.propertyChanged("radius", old, noo);
	},
	
	getBounds : function() {
		var r = this.radius,
			p = this.getPosition();
		return [p.x - r.x, p.y - r.y, p.x + r.x, p.y + r.y];
	}
	
}, { //Static
	TYPE : "ellipse"
});