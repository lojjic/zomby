

Package("zomby.editor.view").LineView = zomby.editor.view.ShapeView.extend({

	create : function() {
		return $.create("div").addClass("line").css({position : "absolute"});
	},

	handlePropertyChanged : function(e) {
		switch(e.name) {
			case "position":
				this.updatePosition();
				break;

			case "start":
			case "end":
				this.updateEndPoints();
				break;

			default:
				this.base(e);
		}
	},

	update : function() {
		this.updatePosition();
		this.updateEndPoints();
	},

	updatePosition : function() {
		var p = this.getShape().getPosition();
		this.getElement().css({
			left : p.x,
			top : p.y
		});
	},

	updateEndPoints : function() {
		var el = this.getElement(),
			line = this.getShape();
		$("div", el).remove();
		var ls = line.getStart(),
			le = line.getEnd();
		for(var x = ls.x; (le.x < ls.x ? x >= le.x : x <= le.x); x += (le.x < ls.x ? -1 : 1)) {
			$.create("div").css({
				position:"absolute",
				left:x,
				top:ls.y + ((le.y - ls.y) * x / (le.x - ls.x)),
				width:1,
				height:1,
				background:"inherit"
			}).appendTo(el);
		}
	}

});


//y / (y2 - y2) = x / (x2 - x1)