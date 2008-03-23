

Package("zomby.core").Event = Base.extend({

	type : null,
	listeners : null,
	
	constructor : function(type) {
		this.type = type;
	},

	subscribe : function(fn) {
		(this.listeners || (this.listeners = [])).push(fn);
	},
	
	fire : function(data) {
		if(this.listeners) {
			$.each(this.listeners, $.rescope(function(i,fn) {
				fn.call(this, data);
			}, this));
		}
	}

});