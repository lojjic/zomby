zomby.model.property.Gradient = zomby.model.property.Property.extend({

	style : "linear",
	stops : null,

	constructor : function(props) {
		this.base(props);
		this.stops = [];
		var s = props.stops;
		if(s) {
			for(var i=0, len=s.length; i<len; i++) {
				this.stops.push(new zomby.model.property.Gradient.Stop(s[i]));
			}
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