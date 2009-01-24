
zomby.model.Library = zomby.model.ModelObject.extend({

	constructor : function(props) {
		// Don't parse the props into Shape objects yet, that's done lazily as they are first requested.
		this._defs = props || {};
		this._shapes = {};
	},

	get : function(id) {
		var s = this._shapes[id], d;
		if(!s) {
			d = this._defs[id];
			if(d) {
				s = this._shapes[id] = zomby.model.ModelObject.fromObject(d);
			}
		}
		return s ? s.clone() : null;
	}

});