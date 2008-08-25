Package("zomby.model");

/**
 * @class Base class for model objects. Provides convenience get and set methods for
 *        manipulating properties by name, and an onpropertychange event object to
 *        which other objects can subscribe to monitor changes.
 *
 * @constructor
 * @param {Object} props (optional) Name-value pairs for the object's initial property values.
 */
zomby.model.ModelBase = Base.extend(
/** @scope zomby.model.ModelBase.prototype */
{
	type : null,

	constructor : function(props) {
		this.base();
		this.type = this.constructor.TYPE;
		if(props) this.set(props);
	},

	/**
	 * Return the type of the model object
	 * @type String
	 */
	getType : function() {
		return this.constructor.TYPE;
	},

	/**
	 * Set the value(s) of one or more properties. Arguments take two forms:
	 * (a) a single property name and value
	 * (b) an object of name-value pairs
	 * For each property specified, the object must actually have a non-Function
	 * property of that name or an error will be thrown.
	 *
	 * @param {String|Object} nameOrPairs Either the name of the property, or an object holding
	 *        a set of property name-value pairs
	 * @param {Object} value The new value of the property, if the first argument was a String
	 */
	set : function(nameOrPairs, value) {
		if(typeof nameOrPairs == "string") {
			if(!(nameOrPairs in this) || typeof this[nameOrPairs] == "function") {
				throw new Error("Tried to set unknown property '" + nameOrPairs + "'");
			}
			if(nameOrPairs != "type") {
				this[nameOrPairs] = value;
			}
		} else if(typeof nameOrPairs == "object") {
			for(var p in nameOrPairs) {
				this.set(p, nameOrPairs[p]);
			}
		} else {
			throw new Error("Argument must be a String or an Object");
		}
	},

	/**
	 * Create a deep copy of this model object.
	 * @return zomby.model.ModelBase
	 */
	clone : function() {
		var obj = new this.constructor();
		for(var p in this) {
			var val = this[p];
			switch(typeof val) {
				case "function":
					break;
				case "object":
					obj[p] = ('clone' in val && typeof val.clone == "function") ? val.clone() : val;
					break;
				default:
					obj[p] = val;
			}
		}
	}

}, {
	TYPE : null
});