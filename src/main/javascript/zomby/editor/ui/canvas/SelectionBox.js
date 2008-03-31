

Package("zomby.editor.ui.canvas").SelectionBox = zomby.editor.Widget.extend({

	props : null,

	constructor : function(parent, initialProps) {
		this.base(parent);
		this.onchange = new zomby.core.Event("change");
		this.props = $.extend({
			x : 0,
			y : 0,
			width : 0,
			height : 0
		}, initialProps);
		this.update();
	},

	create : function() {
		return $.create("div").addClass("selection-box").css({"position":"absolute"})
					.mousedown($.rescope(this.startMove, this));
	},

	getPosition : function() {
		return {x:this.props.x, y:this.props.y};
	},

	setPosition : function(x, y) {
		this.props.x = x;
		this.props.y = y;
		this.update();
	},

	setWidth : function(w) {
		this.props.width = w;
		this.update();
	},

	setHeight : function(h) {
		this.props.height = h;
		this.update();
	},

	/**
	 * Set the size and position of the selection box from the given bounds
	 * @param {Array} b - the bounds [left, top, right, bottom]
	 */
	setBounds : function(b) {
		this.props = {
			x : b[0],
			y : b[1],
			width : b[2] - b[0],
			height : b[3] - b[1]
		};
		this.update();
	},

	update : function() {
		var p = this.props,
			el = this.getElement(),
			len = function(prop) {
				return parseInt(el.css(prop)) || 0;
			};
		el.css({
			left : p.x,
			top : p.y,
			width : p.width - len("border-left-width") - len("border-right-width"),
			height : p.height - len("border-top-width") - len("border-bottom-width")
		});
		this.onchange.fire();
	},

	startMove : function(e) {
		if(!this._moving) {
			this._moving = {
				last : {x:e.clientX, y:e.clientY}
			};
			this.getElement().parent()
					.bind("mousemove.selection-box-move", $.rescope(this.doMove, this))
					.bind("mouseup.selection-box-move click.selection-box-move", $.rescope(this.stopMove, this));
			e.stopPropagation();
		}
	},

	doMove : function(e) {
		if(this._moving) {
			var x = e.clientX,
				y = e.clientY,
				l = this._moving.last;
			this.props.x += x - l.x;
			this.props.y += y - l.y;
			this.update();
			l.x = x;
			l.y = y;
		}
	},

	stopMove : function(e) {
		if(this._moving) {
			this.getElement().parent()
					.unbind("mousemove.selection-box-move")
					.unbind("mouseup.selection-box-move click.selection-box-move");
			this._moving = null;
			e.stopPropagation();
		}
	}

});