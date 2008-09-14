
zomby.Player = Base.extend({

	ready : false,
	element : null,
	data : null,

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
			// TODO load external file or parse JSON
		} else {
			this.data = src;
		}
	},

	playWhenReady : function() {
		var me = this;
		(function check() {
			if(me.element && me.src) {
				var tl = new zomby.model.Timeline();
			} else {
				setTimeout(check, 100);
			}
		})();
	}

});