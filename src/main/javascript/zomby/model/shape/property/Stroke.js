Package("zomby.model.shape.property");

zomby.model.shape.property.Stroke = zomby.model.ModelBase.extend({

	paint : "#000",
	width : 1,
	cap : "butt",
	join : "miter",
	miterlimit : 4,
	dasharray : null,
	dashoffset : 0,
	opacity : 1

}, {

	TYPE : "stroke",

	Cap : {
		BUTT : "butt",
		ROUND : "round",
		SQUARE : "square"
	},

	Join : {
		MITER : "miter",
		ROUND : "round",
		BEVEL : "bevel"
	}

});