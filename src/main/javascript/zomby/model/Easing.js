zomby.model.Easing = zomby.model.ModelObject.extend({

	code : "",

	execute : function(time, begin, change, duration) {
		var fn = this.getPrivate("fn");
		if(!fn) {
			fn = new Function("t", "b", "c", "d", this.code);
			this.setPrivate(fn);
		}
		return fn(time, begin, change, duration);
	}

}, {
	TYPE : "easing"
});

zomby.model.Easing.Linear = new zomby.model.Easing({
	code : "return b+c*t/d"
});