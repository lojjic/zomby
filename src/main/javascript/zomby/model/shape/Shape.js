Package("zomby.model.shape");

zomby.model.shape.Shape = zomby.model.ModelBase.extend({

	type : null,
	position : {x:0, y:0},

	/**
	 * @constructor
	 * @param {Object} props (optional) Name-value pairs for the shape's initial values. 
	 */
	constructor : function(props) {
		this.base(props);
		this.type = this.constructor.TYPE;
	},

	getType : function() {
		return this.type;
	},

	getPosition : function() {
		return this.position;
	},
		
	setPosition : function(x, y) {
		this.set("position", {x:x, y:y});
	},

	getBounds : function() {
		throw new Error("Not Implemented: Shape.getBounds()");
	},

	getWidth : function() {
		var b = this.getBounds();
		return b[2] - b[0];
	},

	getHeight : function() {
		var b = this.getBounds();
		return b[3] - b[1];
	}

}, {
	TYPE : "shape"
});