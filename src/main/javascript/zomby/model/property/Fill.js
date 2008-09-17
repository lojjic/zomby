zomby.model.property.Fill = zomby.model.property.Property.extend({

	paint : null,
	rule : "nonzero",
	opacity : 1

}, {

	TYPE : "fill",

	Rule : {
		NONZERO : "nonzero",
		EVENODD : "evenodd"
	}

});