
zomby.model.Library = zomby.model.ModelObject.extend({

	constructor : function(defs) {
		this.base();
		// Don't parse the props into ModelObject instances yet, that's done lazily as they are first requested.
		this.setPrivate('_defs', defs || []);
		this.setPrivate('_objs', []);
	},

	/**
	 * Get a ModelObject from the library by its index.
	 * @param {Number} idx
	 */
	get : function(idx) {
		var objects = this.getPrivate('_objs'),
			s = objects[idx], d;
		if(!s) {
			d = this.getPrivate('_defs')[idx];
			if(d) {
				s = objects[idx] = zomby.model.ModelObject.fromObject(d);
			}
		}
		return s ? s.clone() : null;
	}

});