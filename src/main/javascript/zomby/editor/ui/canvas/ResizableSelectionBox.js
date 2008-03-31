

Package("zomby.editor.ui.canvas").ResizableSelectionBox = zomby.editor.ui.canvas.SelectionBox.extend({

	create : function() {
		var box = this,
			el = this.base();
		$.each(["n","ne","e","se","s","sw","w","nw"], function(i,dir) {
			$.create("div").addClass("resize-handle resize-" + dir)
				.mousedown(function(e) {
					box.startResize(e, dir);
				})
				.appendTo(el);
		});
		return el;
	},

	startResize : function(e, dir) {
		if(!this._resizing) {
			this._resizing = {
				dir : dir,
				start : {x:e.clientX, y:e.clientY},
				startProps : $.extend({},this.props)
			};
			this.getElement().parent()
					.bind("mousemove.selection-box-resize", $.rescope(this.doResize, this))
					.bind("mouseup.selection-box-resize click.selection-box-resize", $.rescope(this.stopResize, this));
			e.stopPropagation();
		}
	},

	doResize : function(e) {
		if(this._resizing) {
			var x = e.clientX,
				y = e.clientY,
				r = this._resizing,
				s = r.start,
				sp = r.startProps,
				p = this.props;

			if(r.dir.match(/e/)) {
				p.width = Math.max(sp.width + x - s.x, 0);
			}
			else if(r.dir.match(/w/)) {
				p.width = Math.max(sp.width - (x - s.x), 0);
				p.x = Math.min(sp.x + x - s.x, sp.x + sp.width);
			}
			if(r.dir.match(/s/)) {
				p.height = Math.max(sp.height+ y - s.y, 0);
			}
			else if(r.dir.match(/n/)) {
				p.height = Math.max(sp.height - (y - s.y), 0);
				p.y = Math.min(sp.y + y - s.y, sp.y + sp.height);
			}
			this.update();
		}
	},

	stopResize : function(e) {
		if(this._resizing) {
			this.getElement().parent()
					.unbind("mousemove.selection-box-resize")
					.unbind("mouseup.selection-box-resize click.selection-box-resize");
			this._resizing = null;
			e.stopPropagation();
		}
	}

});