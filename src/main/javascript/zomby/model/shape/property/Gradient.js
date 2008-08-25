Package("zomby.model.shape.property");

zomby.model.shape.property.Gradient = zomby.model.ModelBase.extend({

	type : "linear",
	stops : null,

	constructor : function(props) {
		this.stops = [];
		this.base(props);
	}

}, {

	TYPE : "gradient",

	Type : {
		LINEAR : "linear",
		RADIAL : "radial"
	},

	Stop : zomby.model.ModelBase.extend({
		offset : 0,
		color : "#000",
		opacity : 1
	})

});