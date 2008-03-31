

Package("zomby.editor.ui.canvas").SelectionManager = Base.extend({

	canvas : null,
	shapes : null,

	constructor : function(canvas) {
		this.canvas = canvas;
		this.shapes = [];
	},

	select : function(shape) {
		this._add(shape);
		this._update();
	},

	deselect : function(shape) {
		this._remove(shape);
		this._update();
	},

	selectShapesInBounds : function(bounds) {
		var sm = this;
		$.each(this.getShapesInBounds(bounds, this.canvas.getShapes()), function() {
			sm._add(this);
		});
		this._update();
	},

	deselectShapesInBounds : function(bounds) {
		var sm = this;
		$.each(this.getShapesInBounds(bounds), function() {
			sm._remove(this);
		});
		this._update();
	},

	getShapesInBounds : function(bounds, shapes) {
		return $.grep(shapes || this.shapes, function(shape) {
			var b = shape.getBounds();
			return (b[0] >= bounds[0] && b[1] >= bounds[1] && b[2] <= bounds[2] && b[3] <= bounds[3]);
		});
	},

	/**
	 * Calculate the total bounds of a group of shapes, i.e. the leftmost left, topmost top, etc.
	 * @param {Array} shapes Array of shapes to calculate the total bounds for
	 * @return the total bounds; [left, top, right, bottom]
	 * @type Array<Number>
	 */
	getTotalBounds : function(shapes) {
		var l, t, r, b;
		l = t = Infinity;
		r = b = -Infinity;
		$.each(shapes, function() {
			var bds = this.getBounds();
			l = Math.min(l, bds[0]);
			t = Math.min(t, bds[1]);
			r = Math.max(r, bds[2]);
			b = Math.max(b, bds[3]);
		});
		return [l, t, r, b];
	},

	isSelected : function(shape) {
		return $.inArray(shape, this.shapes) >= 0;
	},

	getSelected : function() {
		return this.shapes;
	},

	selectAll : function() {
		var sm = this;
		$.each(this.canvas.shapeViews, function() {
			sm._add(this.getShape());
		});
		this._update();
	},

	deselectAll : function() {
		var sm = this;
		$.each(this.shapes, function() {
			sm._remove(this);
		});
		this._update();
	},

	handleSelectionBoxChange : function(e) {
		
	},

	_add : function(shape) {
		var idx = $.inArray(shape, this.shapes);
		if(idx < 0) {
			this.shapes.push(shape);
		}
	},

	_remove : function(shape) {
		var idx = $.inArray(shape, this.shapes);
		if(idx >= 0) {
			this.shapes.splice(idx, 1);
		}
	},

	_update : function() {
		var sb = this._selectionBox;
		if(sb) {
			sb.destroy();
		}

		if(this.shapes.length == 1) {
			sb = this._selectionBox = new zomby.editor.ui.canvas.ResizableSelectionBox(this.canvas.getElement());
			sb.setBounds(this.shapes[0].getBounds());
			sb.onchange.subscribe();
		}
		else if(this.shapes.length > 1) {
			sb = this._selectionBox = new zomby.editor.ui.canvas.SelectionBox(this.canvas.getElement());
			sb.setBounds(this.getTotalBounds(this.shapes));
		}
	}

});