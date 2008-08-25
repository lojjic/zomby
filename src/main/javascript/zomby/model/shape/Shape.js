Package("zomby.model.shape");

zomby.model.shape.Shape = zomby.model.ModelBase.extend({

	type : null,
	x : 0,
	y : 0,

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