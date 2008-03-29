

Package("zomby.view.shape").RectangleView = zomby.view.shape.ShapeView.extend({

	create : function() {
		return $.create(zomby.core.Constants.SVG_NS, "rect");
	},

	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "width":
			case "height":
			case "position":
				this.updateSizeAndPosition();
				break;
		}
	},

	update : function() {
		this.updateSizeAndPosition();
	},

	updateSizeAndPosition : function() {
		var s = this.getShape(),
			p = s.getPosition();
		this.getElement().attr({
			x : p.x,
			y : p.y,
			width : s.getWidth(),
			height : s.getHeight()
		});
	}

});