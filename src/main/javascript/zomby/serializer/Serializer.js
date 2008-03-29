
/**
 * @class Serializer
 */
var Serializer = Base.extend({
	
	/**
	 * @method serialize
	 * @param {Object} obj - the object to serialize to a string
	 * @return {String} the serialized object in JSON format
	 */
	serialize : function(obj) {
		return JSON.stringify(this.getData(obj));
	},
	
	getData : function(obj) {
		return {};
	},
	
	/**
	 * @method parse
	 * @param {String} str - the string to parse into an object
	 * @return {Object} the parsed object
	 */
	parse : function(str) {
		throw new Error("Not implemented: Serializer.parse(str)");
	}

});