

Package("zomby.editor.view").EllipseView = zomby.editor.view.ShapeView.extend({

	create : function() {
		return $.create("div").addClass("ellipse").css({position : "absolute"});
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
			w = s.getWidth(),
			h = s.getHeight(),
			p = s.getPosition();
		this.getElement().css({
			width : w,
			height : h,
			left : p.x - w/2,
			top : p.y - h/2
		});

	}

});