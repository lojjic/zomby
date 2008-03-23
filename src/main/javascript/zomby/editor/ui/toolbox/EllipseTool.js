

Package("zomby.editor.ui.toolbox").EllipseTool = zomby.editor.ui.toolbox.Tool.extend({

	title : "Ellipse",
	iconClass : "ellipse-tool-icon",
	minLassoSize : 4,

	handledragstart : function(e) {
		this.startLasso(e);
	},
	
	handledrag : function(e) {
		this.sizeLasso(e);
	},
	
	handledragend : function(e) {
		var l = this._dragState.lasso;
		if(!l.isBelowMinSize()) {
			e.data.canvas.addShape(this.createShape(l));
		}
		this.cancelLasso();
	},
	
	handleKeyPress : function(e) {
		alert(e.keyCode);
	},
	
	startLasso : function(e) {
		var x = e.data.canvasX,
			y = e.data.canvasY,
			c = e.data.canvas,
			ds = this._dragState = {start : {x:x, y:y}},
			l = ds.lasso = new zomby.editor.ui.toolbox.Lasso(c.getElement());
		l.setMinSize(8);
		l.setStart(x, y);
	},
	
	sizeLasso : function(e) {
		var ds = this._dragState,
		    w = e.data.canvasX - ds.start.x,
		    h = e.data.canvasY - ds.start.y;
		if(e.shiftKey) {
			w = h = Math.min(w, h);
		}
		ds.lasso.setSize(w, h);
	},
	
	cancelLasso : function() {
		this._dragState.lasso.destroy();
		this._dragState = null;
	},
	
	createShape : function(lasso) {
		var c = lasso.getCenter(),
			b = lasso.getBounds(),
			ell = new zomby.rt.shape.Ellipse();
		ell.setPosition(c.x, c.y);
		ell.setRadius(Math.abs(b[2] - b[0]) / 2, Math.abs(b[3] - b[1]) / 2);
		return ell;
	}

});