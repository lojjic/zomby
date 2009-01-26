
zomby.Player = Base.extend({
	ready : false,
	element : null,
	data : null,
	timeline : null,

	constructor : function(el, src) {
		this.findElement(el);
		this.loadData(src);
		this.playWhenReady();
	},

	findElement : function(el) {
		if(typeof el == "string") {
			var me = this;
			(function check() {
				var test = document.getElementById(el);
				if(test) {
					me.element = test;
				} else {
					setTimeout(check, 100);
				}
			})();
		} else {
			this.element = el;
		}
	},

	loadData : function(src) {
		if(typeof src == "string") {
			var me = this;
			zomby.Util.getJSON(src, function(obj) {
				me.data = obj;
			});
		} else {
			this.data = src;
		}
	},

	playWhenReady : function() {
		var me = this;
		(function check() {
			if(me.element && me.data) {
				me.timeline = new zomby.model.Timeline(me.data);
				me.timelineView = new zomby.view.svg.TimelineSvgView(me.timeline, null);
				me.timelineView.appendTo(me.element);
				me.start();
			} else {
				setTimeout(check, 100);
			}
		})();
	},

	/**
	 * Start the timeline playing
	 */
	start : function() {
		var me = this;
		if(!me._timer) {
			me._timer = setInterval(function() {
				me.timeline.step();
				me.timelineView.update();
			}, 1000 / me.timeline.fps);
		}
	},

	/**
	 * Stop the timeline playing
	 */
	stop : function() {
		if(this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}
	}

});