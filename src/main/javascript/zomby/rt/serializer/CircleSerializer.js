
/**
 * @class CircleSerializer
 */
var CircleSerializer = Serializer.extend({
	
	getData : function(obj) {
		if(!(obj instanceof Circle)) {
			throw new TypeError("CircleSerializer: serialize called with non-Circle argument");
		}
		var data = this.base(obj);
		data.radius = obj.radius;
		return data;
	},
	
	/**
	 * @method parse
	 * @param {String} str - the string to parse into an object
	 * @return {Object} the parsed object
	 */
	parse : function(str) {
	}

});