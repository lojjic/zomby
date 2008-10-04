
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
			})
		} else {
			this.data = src;
		}
	},

	playWhenReady : function() {
		var me = this;
		(function check() {
			if(me.element && me.data) {
				var tl = this.timeline = new zomby.model.Timeline(me.data);
				tl.start();
			} else {
				setTimeout(check, 100);
			}
		})();
	}

});