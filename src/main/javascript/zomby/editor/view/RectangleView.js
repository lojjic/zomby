

Package("zomby.editor.view").RectangleView = zomby.editor.view.ShapeView.extend({

	create : function() {
		return $.create("div").addClass("rectangle").css({position : "absolute"});
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