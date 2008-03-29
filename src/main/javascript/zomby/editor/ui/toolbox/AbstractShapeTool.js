

Package("zomby.editor.ui.toolbox").AbstractShapeTool = zomby.editor.ui.toolbox.Tool.extend({

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
		ds.lasso.setEnd(ds.start.x + w, ds.start.y + h);
	},
	
	cancelLasso : function() {
		this._dragState.lasso.destroy();
		this._dragState = null;
	},

	createShape : function(lasso) {
		throw new Error("Not Implemented.");
	}

});