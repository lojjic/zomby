
zomby.editor.ui.toolbox.LineTool = zomby.editor.ui.toolbox.AbstractShapeTool.extend({

	title : "Line",
	iconClass : "line-tool-icon",

	createShape : function(lasso) {
		var s = lasso.getStart(),
			e = lasso.getEnd(),
			line = new zomby.model.shape.Line();
		line.setStart(s.x, s.y);
		line.setEnd(e.x, e.y);
		return line;
	}

});