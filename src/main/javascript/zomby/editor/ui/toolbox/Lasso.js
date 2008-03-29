

Package("zomby.editor.ui.toolbox").Lasso = zomby.editor.Widget.extend({

	start : {x:0, y:0},
	end : {x:0, y:0},
	minSize : 0,

	create : function() {
		return $.create("div")
			.addClass("lasso")
			.css({position : "absolute"});
	},
	
	setStart : function(x, y) {
		this.start = this.end = {x:x, y:y};
		this.update();
	},
	
	setEnd : function(x, y) {
		this.end = {x:x, y:y};
		this.update();
	},

	getStart : function() {
		return this.start;
	},

	getEnd : function() {
		return this.end;
	},
	
	setMinSize : function(size) {
		this.minSize = size;
	},
	
	isBelowMinSize : function() {
		return this.getWidth() < this.minSize && this.getHeight() < this.minSize;
	},

	update : function() {
		var b = this.getBounds(),
			el = this.getElement(),
			len = function(prop) {
				return parseInt(el.css(prop)) || 0;
			};
		el.css({
			left : b[0],
			top : b[1],
			width : b[2] - b[0] - len("border-left-width") - len("border-right-width"),
			height : b[3] - b[1] - len("border-top-width") - len("border-bottom-width")
		});
		el[this.isBelowMinSize() ? "addClass" : "removeClass"]("lasso-toosmall");
	},
	
	getBounds : function() {
		var x1 = this.start.x,
		    y1 = this.start.y,
		    x2 = this.end.x,
		    y2 = this.end.y;
		return [
			Math.min(x1, x2),
			Math.min(y1, y2),
			Math.max(x1, x2),
			Math.max(y1, y2)
		];
	},
	
	getCenter : function() {
		var b = this.getBounds();
		return {
			x : b[0] + (b[2] - b[0]) / 2,
			y : b[1] + (b[3] - b[1]) / 2
		};
	},

	getWidth : function() {
		return Math.abs(this.end.x - this.start.x);
	},

	getHeight : function() {
		return Math.abs(this.end.y - this.start.y);
	}

});