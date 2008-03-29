

Package("zomby.view.shape").EllipseView = zomby.view.shape.ShapeView.extend({

	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "ellipse");
	},

	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "radius":
			case "position":
				this.updateRadiusAndPosition();
				break;
		}
	},

	update : function() {
		this.updateRadiusAndPosition();
	},

	updateRadiusAndPosition : function() {
		var s = this.getShape(),
			p = s.getPosition();
		this.getElement().attr({
			cx : p.x,
			cy : p.y,
			rx : s.getWidth() / 2,
			ry : s.getHeight() / 2
		});
	}

});