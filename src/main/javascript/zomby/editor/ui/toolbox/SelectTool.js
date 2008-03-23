

Package("zomby.editor.ui.toolbox").SelectTool = zomby.editor.ui.toolbox.Tool.extend({

	title : "Select",
	iconClass : "select-tool-icon",

	handleclick : function(e) {
		var s = e.data.shape,
			c = e.data.canvas;
		if(!s || !e.ctrlKey) {
			c.deselectAll();
		}
		if(s) {
			if(e.ctrlKey && c.isShapeSelected(s)) {
				c.deselectShape(s);
			} else {
				c.selectShape(s);
			}
		}
	},
	
	handledragstart : function(e) {
		var c = e.data.canvas,
			s = e.data.shape,
			x = e.data.canvasX,
			y = e.data.canvasY,
			ds = this._dragState = {start : {x:x, y:y}};
		if(s) {
			ds.shape  = s;
			if(!c.isShapeSelected(s)) {
				c.deselectAll();
				c.selectShape(s);
			}
		} else {
			ds.lasso = new zomby.editor.ui.toolbox.Lasso(c.getElement());
			ds.lasso.setStart(x, y);
		}
	},
	
	handledrag : function(e) {
		var ds = this._dragState,
			c = e.data.canvas,
			newX = e.data.canvasX,
			newY = e.data.canvasY,
			deltaX = newX - ds.start.x,
			deltaY = newY - ds.start.y,
			s = ds.shape;
		ds.start = {x:newX, y:newY};
		if(s) {
			$.each(c.getSelectedShapes(), function() {
				var old = this.getPosition();
				this.setPosition(old.x + deltaX, old.y + deltaY);
			})
		} else {
			var l = ds.lasso,
				old = l.getSize();
			l.setSize(old.w + deltaX, old.h + deltaY);
		}
	},
	
	handledragend : function(e) {
		var l = this._dragState.lasso,
			c = e.data.canvas;
		if(l) {
			if(!e.ctrlKey) {
				c.deselectAll()
			}
			c.selectShapesInBounds(l.getBounds());
			l.destroy();
		}
		this._dragState = null;
	}

});