zomby.model.property.Gradient = zomby.model.property.Property.extend({

	style : "linear",
	stops : null,

	constructor : function(props) {
		this.base(props);
		this.stops = [];
		var s = props.stops;
		if(s) {
			zomby.Util.each(s, function(stop) {
				this.stops.push(new zomby.model.property.Gradient.Stop(stop));
			}, this);
		}
	}

}, {

	TYPE : "gradient",

	Style : {
		LINEAR : "linear",
		RADIAL : "radial"
	},

	Stop : zomby.model.ModelObject.extend({
		offset : 0,
		color : "#000",
		opacity : 1
	})

});