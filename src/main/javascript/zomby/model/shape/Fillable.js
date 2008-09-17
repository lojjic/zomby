zomby.model.shape.Fillable = zomby.model.shape.Strokeable.extend({

	fill : null,

	constructor : function(props) {
		this.base(props);
		this.fill = new zomby.model.property.Fill(props ? props.fill : null);
	}

});