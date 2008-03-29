

Package("zomby.view.shape").LineView = zomby.view.shape.ShapeView.extend({

	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "line");
	},

	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "position":
			case "start":
			case "end":
				this.updateEndPoints();
				break;

			default:
				this.base(e);
		}
	},

	update : function() {
		this.updateEndPoints();
	},

	updateEndPoints : function() {
		var line = this.getShape(),
			ls = line.getStart(),
			le = line.getEnd();
		this.getElement().attr({
			x1 : ls.x,
			y1 : ls.y,
			x2 : le.x,
			y2 : le.y,
			stroke : "#000"
		});
	}

});


//y / (y2 - y2) = x / (x2 - x1)