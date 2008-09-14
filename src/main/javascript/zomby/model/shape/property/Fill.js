zomby.model.shape.property.Fill = zomby.model.shape.property.Property.extend({

	paint : "none",
	rule : "nonzero",
	opacity : 1

}, {

	TYPE : "fill",

	Rule : {
		NONZERO : "nonzero",
		EVENODD : "evenodd"
	}

});