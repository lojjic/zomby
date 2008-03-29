

Package("zomby.editor.ui.toolbox").LineTool = zomby.editor.ui.toolbox.AbstractShapeTool.extend({

	title : "Line",
	iconClass : "line-tool-icon",

	createShape : function(lasso) {
		var s = lasso.getStart(),
			e = lasso.getEnd(),
			line = new zomby.rt.shape.Line();
		line.setPosition(s.x, s.y);
		line.setStart(0, 0);
		line.setEnd(e.x - s.x, e.y - s.y);
		return line;
	}

});