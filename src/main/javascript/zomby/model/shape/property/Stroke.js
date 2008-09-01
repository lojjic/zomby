zomby.model.shape.property.Stroke = zomby.model.shape.property.Property.extend({

	paint : "#000",
	width : 1,
	cap : "butt",
	join : "miter",
	miterLimit : 4,
	dashArray : null,
	dashOffset : 0,
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