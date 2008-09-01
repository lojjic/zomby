zomby.model.shape.Strokeable = zomby.model.shape.Shape.extend({

	stroke : null,

	constructor : function(props) {
		this.base(props);
		this.stroke = new zomby.model.shape.property.Stroke(props ? props.stroke : null);
	}

});