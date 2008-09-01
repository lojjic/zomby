zomby.model.shape.property.Gradient = zomby.model.shape.property.Property.extend({

	type : "linear",
	stops : null,

	constructor : function(props) {
		this.base(props);
		this.stops = [];
		var s = props.stops, i;
		if(s) {
			for(i=0; i<s.length; i++) {
				this.stops.push(new zomby.model.shape.property.Gradient.Stop(s[i]));
			}
		}
	}

}, {

	TYPE : "gradient",

	Type : {
		LINEAR : "linear",
		RADIAL : "radial"
	},

	Stop : zomby.model.ModelObject.extend({
		offset : 0,
		color : "#000",
		opacity : 1
	})

});