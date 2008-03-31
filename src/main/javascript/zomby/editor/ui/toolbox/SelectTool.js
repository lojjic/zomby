

Package("zomby.editor.ui.toolbox").SelectTool = zomby.editor.ui.toolbox.Tool.extend({

	title : "Select",
	iconClass : "select-tool-icon",

	handlemousedown : function(e) {
		var s = e.data.shape,
			c = e.data.canvas,
			sm = c.getSelectionManager();
		if(!s || !e.ctrlKey) {
			sm.deselectAll();
		}
		if(s) {
			if(e.ctrlKey && sm.isSelected(s)) {
				sm.deselect(s);
			} else {
				sm.select(s);
			}
		}
	},
	
	handledragstart : function(e) {
		var c = e.data.canvas,
			s = e.data.shape,
			x = e.data.canvasX,
			y = e.data.canvasY,
			ds = this._dragState = {last : {x:x, y:y}},
			sm = c.getSelectionManager();
		if(s) {
			ds.shape  = s;
			if(!c.isShapeSelected(s)) {
				sm.deselectAll();
				sm.select(s);
			}
		} else {
			ds.lasso = new zomby.editor.ui.toolbox.Lasso(c.getElement());
			ds.lasso.setStart(x, y);
		}
	},
	
	handledrag : function(e) {
		var ds = this._dragState,
			c = e.data.canvas,
			s = ds.shape,
			newX = e.data.canvasX,
			newY = e.data.canvasY;
		if(s) {
			$.each(c.getSelectedShapes(), function() {
				var old = this.getPosition();
				this.setPosition(old.x + newX - ds.last.x, old.y + newY - ds.last.y);
			})
		} else {
			ds.lasso.setEnd(newX, newY);
		}
		ds.last = {x:newX, y:newY};
	},
	
	handledragend : function(e) {
		var l = this._dragState.lasso,
			c = e.data.canvas,
			sm = c.getSelectionManager();
		if(l) {
			if(!e.ctrlKey) {
				sm.deselectAll()
			}
			sm.selectShapesInBounds(l.getBounds());
			l.destroy();
		}
		this._dragState = null;
	}

});