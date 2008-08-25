Package("zomby.model.shape.property")

zomby.model.shape.property.Fill = zomby.model.ModelBase.extend({

	paint : "#000",
	rule : "nonzero",
	opacity : 1

}, {

	TYPE : "fill",

	Rule : {
		NONZERO : "nonzero",
		EVENODD : "evenodd"
	}

});