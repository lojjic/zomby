

Package("zomby.rt.shape").Stroke = Base.extend({

	size : 1,
	style : "solid",
	color : "#000",

	constructor : function(size, style, color) {
		this.setSize(size);
		this.setStyle(style);
		this.setColor(color);
	},

	getSize : function() {
		return this.size;
	},

	setSize : function(size) {
		this.size = size;
	},

	getStyle : function() {
		return this.style;
	},

	setStyle : function(style) {
		this.style = style;
	},

	getColor : function() {
		return this.color;
	},

	setColor : function(color) {
		this.color = color;
	}

});