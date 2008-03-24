

Package("zomby.editor.ui.toolbox").RectangleTool = zomby.editor.ui.toolbox.AbstractShapeTool.extend({

	title : "Rectangle",
	iconClass : "rectangle-tool-icon",

	createShape : function(lasso) {
		var c = lasso.getCenter(),
			b = lasso.getBounds(),
			rect = new zomby.rt.shape.Rectangle();
		rect.setPosition(c.x, c.y);
		rect.setWidth(Math.abs(b[2] - b[0]));
		rect.setHeight(Math.abs(b[3] - b[1]));
		return rect;
	}

});