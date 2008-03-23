

Package("zomby.editor.ui.toolbox").Toolbox = zomby.editor.Widget.extend({

	toolClasses : [
		"zomby.editor.ui.toolbox.SelectTool",
		"zomby.editor.ui.toolbox.EllipseTool"
	],
	
	create : function(parent) {
		var el = $.create("div").addClass("toolbox");
		this.createTools(el);
		return el;
	},
	
	createTools : function(el) {
		this.tools = $.map(this.toolClasses, $.rescope(function(className) {
			var tool = new (eval(className))(el);
			tool.selectEvent.subscribe($.rescope(this.toolSelected, this));
			return tool;
		}, this));
		this.tools[0].select();
	},
	
	getTools : function() {
		return this.tools;
	},
	
	getSelectedTool : function() {
		return this._selectedTool;
	},
	
	toolSelected : function(tool) {
		if(this._selectedTool) {
			this._selectedTool.deselect();
		}
		this._selectedTool = tool;
	}

});