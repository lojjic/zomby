

jQuery.throttle = function(fn, delay) {
	if(!fn._throttled) { //only wrap once
		var orig = fn, lastRun = 0;
		fn = function() {
			var now = new Date();
			if(now - lastRun > delay) {
				orig.apply(this, arguments);
				lastRun = now;
			}
		}
		fn._throttled = true;
	}
	return fn;
};
