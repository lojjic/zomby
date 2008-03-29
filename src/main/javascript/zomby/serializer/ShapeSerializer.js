
/**
 * @class CircleSerializer
 */
var ShapeSerializer = Serializer.extend({
	
	getData : function(obj) {
		if(!(obj instanceof Shape)) {
			throw new TypeError("ShapeSerializer: serialize called with non-Shape argument");
		}
		var data = this.base(obj);
		data.type = obj.type;
		data.transform = obj.transform;
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