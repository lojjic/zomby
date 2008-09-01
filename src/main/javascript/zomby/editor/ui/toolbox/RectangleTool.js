
zomby.editor.ui.toolbox.RectangleTool = zomby.editor.ui.toolbox.AbstractShapeTool.extend({

	title : "Rectangle",
	iconClass : "rectangle-tool-icon",

	createShape : function(lasso) {
		var c = lasso.getCenter(),
			b = lasso.getBounds(),
			w = Math.abs(b[2] - b[0]),
			h = Math.abs(b[3] - b[1]),
			rect = new zomby.model.shape.Rectangle();
		rect.setPosition(c.x - w/2, c.y - h/2);
		rect.setWidth(w);
		rect.setHeight(h);
		return rect;
	}

});