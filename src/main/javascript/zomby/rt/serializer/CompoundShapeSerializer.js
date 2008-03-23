
/**
 * @class CompoundShapeSerializer
 */
var CompoundShapeSerializer = ShapeSerializer.extend({
	
	getData : function(obj) {
		if(!(obj instanceof Shape)) {
			throw new TypeError("CompoundShapeSerializer: serialize called with non-CompoundShape argument");
		}
		var data = this.base(obj);
		data.objects = $.map(obj.objects, function() {
			// getData() for each object
		});
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