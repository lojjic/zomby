zomby.model.shape.Shape = zomby.model.ModelObject.extend({

	type : null,

	/**
	 * X position
	 */
	x : 0,

	/**
	 * Y position
	 */
	y : 0,

	/**
	 * Scale. 1 == native size.
	 */
	scale : 1,

	/**
	 * Rotation of the shape in degrees
	 */
	rotate : 0,

	/**
	 * Opacity. 0 == fully transparent, 1 == fully opaque
	 */
	opacity : 1,

	constructor : function(props) {
		this.base(props);
	},

	getBounds : function() {
		return [0,0,0,0];
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