
zomby.editor.ui.toolbox.Tool = zomby.editor.Widget.extend({

	title : "Tool",
	iconClass : "tool-icon",

	/**
	 * @constructor
	 */
	constructor : function(parent) {
		this.base(parent);
		this.selectEvent = new zomby.core.Event("toolselected");
		this.deselectEvent = new zomby.core.Event("tooldeselected");
	},
	
	create : function(parent) {
		return $.create("div")
			.addClass("tool-icon " + this.iconClass)
			.attr("title", this.title)
			.hover($.rescope(this.over, this), $.rescope(this.out, this))
			.mousedown($.rescope(this.select, this));
	},
	
	over : function(e) {
		this.getElement().addClass("tool-icon-hover");
	},
	
	out : function(e) {
		this.getElement().removeClass("tool-icon-hover");
	},
	
	select : function() {
		if(!this.selected) {
			this.selected = true;
			this.getElement().addClass("tool-icon-selected");
			this.selectEvent.fire(this);
		}
	},
	
	deselect : function() {
		if(this.selected) {
			this.selected = false;
			this.getElement().removeClass("tool-icon-selected");
			this.deselectEvent.fire(this);
		}
	},
	
	handleclick : function(e) {
	},
	
	handlemousedown : function(e) {
	},
	
	handlemouseup: function(e) {
	},
	
	handlemousemove : function(e) {
	},
	
	handledragstart : function(e) {
	},
	
	handledrag : function(e) {
	},
	
	handledragend : function(e) {
	}

});