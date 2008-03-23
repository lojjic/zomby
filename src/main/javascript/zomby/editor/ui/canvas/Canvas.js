

Package("zomby.editor.ui.canvas").Canvas = zomby.editor.Widget.extend({

	dragDelay : 50,

	constructor : function(parent) {
		this.base(parent);
		this.shapeViews = [];
		this.initEvents();
	},

	create : function() {
		return $.create("div").addClass("canvas");
	},
	
	initEvents : function() {
		var mouseTypes = ["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "click", "dblclick"],
		    kbdTypes = ["keypress", "keydown", "keyup"],
		    customTypes = ["dragstart", "drag", "dragend"];
	
		// Hook up mouse events:
		$.each(mouseTypes, $.rescope(function(i,type) {
			this.getElement()[type]($.rescope(this[type], this));
		}, this));
		
		// Hook up keyboard events:
		$.each(kbdTypes, $.rescope(function(i,type) {
			$(document)[type]($.rescope(this[type], this));
		}, this));
		
		// Create custom Event objects:
		var events = this.events = {};
		$.each([mouseTypes, kbdTypes, customTypes], function() {
			$.each(this, function() {
				events[this] = new zomby.core.Event(this);
			});
		});
	},
	
	addShape : function(shape) {
		this.shapeViews.push(new zomby.editor.view.EllipseView(shape, this.getElement()));
	},

	removeShape : function(shape) {
		this.shapeViews = $.map(this.shapeViews, function(sv) {
			if(sv.getShape() === shape) {
				sv.destroy();
				return null;
			}
			return sv
		});
	},
	
	getShapeViewsInBounds : function(bounds) {
		return $.map(this.shapeViews, function(view) {
			var b = view.getShape().getBounds();
			return (b[0] >= bounds[0] && b[1] >= bounds[1] && b[2] <= bounds[2] && b[3] <= bounds[3]) ? view : null;
		});
	},

	getShapeViewByElement : function(el) {
		return $.grep(this.shapeViews, function(sv) {
			return sv.getElement()[0] === el;
		})[0];
	},

	getShapeViewByShape : function(shape) {
		return $.grep(this.shapeViews, function(sv) {
			return sv.getShape() === shape;
		})[0];
	},

	selectShape : function(shape) {
		var sv = this.getShapeViewByShape(shape);
		if(sv) {
			sv.select();
		}
	},
	
	deselectShape : function(shape) {
		var sv = this.getShapeViewByShape(shape);
		if(sv) {
			sv.deselect();
		}
	},

	selectShapesInBounds : function(bounds) {
		$.each(this.getShapeViewsInBounds(bounds), function() {
			this.select();
		});
	},

	deselectShapesInBounds : function(bounds) {
		$.each(this.getShapeViewsInBounds(bounds), function() {
			this.deselect();
		});
	},

	isShapeSelected : function(shape) {
		var sv = this.getShapeViewByShape(shape);
		return sv && sv.isSelected();
	},

	getSelectedShapes : function() {
		return $.map(this.shapeViews, function(sv) {
			return (sv.isSelected() ? sv.getShape() : null);
		});
	},

	selectAll : function() {
		$.each(this.shapeViews, function() {
			this.select();
		});
	},
	
	deselectAll : function() {
		$.each(this.shapeViews, function() {
			this.deselect();
		});
	},
	
	mousedown : function(e) {
		this.events.mousedown.fire(this.decorateEvent(e));
		this._mousedown = new Date();
	},

	mouseup : function(e) {
		this.events.mouseup.fire(this.decorateEvent(e));
		if(this._dragging) {
			this._dragging = false;
			this.events.dragend.fire(this.decorateEvent(e));
		}
		this._mousedown = null;
	},

	mousemove : function(e) {
		this.events.mousemove.fire(this.decorateEvent(e));
		if(this._mousedown) {
			if(!this._dragging && new Date() - this._mousedown > this.dragDelay) {
				this._dragging = true;
				this.events.dragstart.fire(this.decorateEvent(e));
			}
			if(this._dragging) {
				this.events.drag.fire(this.decorateEvent(e));
			}
		}
	},
	
	mouseover : function(e) {
		this.events.mouseover.fire(this.decorateEvent(e));
	},
	
	mouseout : function(e) {
		this.events.mouseout.fire(this.decorateEvent(e));
	},

	click : function(e) {
		this.events.click.fire(this.decorateEvent(e));
	},

	dblclick : function(e) {
		this.events.dblclick.fire(this.decorateEvent(e));
	},
	
	keypress : function(e) {
		this.events.keypress.fire(this.decorateEvent(e));
	},
	
	keydown : function(e) {
		this.events.keydown.fire(this.decorateEvent(e));
	},
	
	keyup : function(e) {
		this.events.keyup.fire(this.decorateEvent(e));
	},
	
	decorateEvent : function(e) {
		var off = this.getElement().offset(),
			el = $(e.target),
			sv = null;
		while(!sv && el.size() > 0 && !el.hasClass("canvas")) {
			sv = this.getShapeViewByElement(el[0]);
			el = el.parent();
		}
		return $.extend({}, e, {
			data : {
				canvas : this,
				canvasX : e.clientX - off.left,
				canvasY : e.clientY - off.top,
				shape : sv ? sv.getShape() : null
			}
		});
	}

});