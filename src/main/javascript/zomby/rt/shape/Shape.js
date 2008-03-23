
Package("zomby.rt.shape").Shape = Base.extend({

	type : null,
	position : {x:0, y:0},

	constructor : function(type) {
		this.base();
		this.type = this.constructor.TYPE;
		this.initEvents();
	},

	initEvents : function() {
		this.events = {
			propertychanged : new zomby.core.Event("propertychanged")
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
		var old = this.position,
			noo = this.position = {x:x, y:y};
		this.propertyChanged("position", old, noo);
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

	propertyChanged : function(name, oldValue, newValue) {
		this.events.propertychanged.fire({name:name, oldValue:oldValue, newValue:newValue, target:this});
	}

}, {
	TYPE : "shape"
});