
Package("zomby.rt.shape").Shape = Base.extend({

	type : null,
	position : {x:0, y:0},

	/**
	 * @constructor
	 * @param {Object} props (optional) Name-value pairs for the shape's initial values. 
	 */
	constructor : function(props) {
		this.base();
		this.initProps(props);
		this.type = this.constructor.TYPE;
		this.onpropertychange = new zomby.core.Event("propertychanged");
	},

	initProps : function(props) {
		for(var i in props) {
			this._setProperty(i, props[i]);
		}
	},

	getType : function() {
		return this.type;
	},

	render : function(parent) {
		var renderer = Renderer.getRenderer(this);
		renderer.render(this, parent);
	},

	serialize : function() {
		var serializer = Serializer.getSerializer(this);
		return serializer.serialize(this);
	},
	
	getPosition : function() {
		return this.position;
	},
		
	setPosition : function(x, y) {
		this._setProperty("position", {x:x, y:y});
	},

	getBounds : function() {
		throw new Error("Not Implemented");
	},

	getWidth : function() {
		var b = this.getBounds();
		return b[2] - b[0];
	},

	getHeight : function() {
		var b = this.getBounds();
		return b[3] - b[1];
	},

	_setProperty : function(name, value) {
		if(!(name in this) || $.isFunction(this[name])) {
			throw new Error("Tried to set unknown shape property '" + name + "'");
		}
		var old = this[name];
		this[name] = value;
		this.onpropertychange.fire({name:name, oldValue:old, newValue:value, target:this});
	}

}, {
	TYPE : "shape"
});