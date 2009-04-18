
zomby.Player = zomby.Base.extend({
	ready : false,
	element : null,
	data : null,
	timeline : null,
	playing : false,
	dropFrames : 0,

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
		if(!this.playing) {
			this.playing = true;

			var me = this,
				lastStepDuration = 0,
				droppedCount = 0;

			function step() {
				var startTime, endTime,
					timeout = 1000 / me.timeline.fps,
					dropLimit = me.dropFrames;
				if(me.playing) {
					startTime = new Date().getTime();

					// Always update the model
					me.timeline.step();

					// Render the frame if the model update didn't take too long, and if the
					// configured number of prior frames have not been dropped.
					if(dropLimit > 0 && droppedCount <= dropLimit && lastStepDuration > timeout) {
						droppedCount++;
					} else {
						me.timelineView.update();
						droppedCount = 0;
					}

					endTime = new Date().getTime();

					lastStepDuration = endTime - startTime;

					me._timer = setTimeout(step, Math.max(0, timeout - lastStepDuration));
				}
			}
			step();
		}
	},

	/**
	 * Stop the timeline playing
	 */
	stop : function() {
		if(this.playing) {
			this.playing = false;
		}
	}

});