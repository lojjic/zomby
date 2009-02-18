
zomby.model.Library = zomby.model.ModelObject.extend({

	constructor : function(props) {
		this.base(props);
		// Don't parse the props into Shape objects yet, that's done lazily as they are first requested.
		this.setPrivate('_defs', props || {});
		this.setPrivate('_shapes', {});
	},

	get : function(id) {
		var shapes = this.getPrivate('_shapes'),
			s = shapes[id], d;
		if(!s) {
			d = this.getPrivate('_defs')[id];
			if(d) {
				s = shapes[id] = zomby.model.ModelObject.fromObject(d);
			}
		}
		return s ? s.clone() : null;
	}

});