
zomby.editor.ui.toolbox.EllipseTool = zomby.editor.ui.toolbox.AbstractShapeTool.extend({

	title : "Ellipse",
	iconClass : "ellipse-tool-icon",

	createShape : function(lasso) {
		var c = lasso.getCenter(),
			b = lasso.getBounds(),
			ell = new zomby.model.shape.Ellipse();
		ell.setPosition(c.x, c.y);
		ell.setRadius(Math.abs(b[2] - b[0]) / 2, Math.abs(b[3] - b[1]) / 2);
		return ell;
	}

});