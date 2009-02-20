(function() {

var _typesToClasses = {},
	changedPropsCache = '_changedProps',
	useGettersAndSetters = (typeof {}.__defineSetter__ == "function");

/**
 * @class Base class for model objects.
 *
 * @constructor
 * @param {Object} props (optional) Name-value pairs for the object's initial property values.
 */
zomby.model.ModelObject = Base.extend(
/** @scope zomby.model.ModelObject.prototype */
{
	type : null,

	constructor : function(props) {
		var me = this,
			privateData = {};

		me.base();

		// Create methods for setting truly private arbitrary data, stored in the closure
		me.setPrivate = function(name, val) {
			return privateData[name] = val;
		};
		me.hasPrivate = function(name) {
			return (name in privateData);
		};
		me.getPrivate = function(name) {
			return privateData[name];
		};

		me.type = me.constructor.TYPE;
		if(props) me.set(props);
	},

	/**
	 * Enumerate the names of all this object's public data properties,
	 * excluding any methods. Will return "conventional private" properties
	 * beginning with underscores; use the setPrivate method to store truly
	 * private data.
	 */
	getPropertyNames: function() {
		var names = [], p;
		for(p in this) {
			if(typeof p != 'function') {
				names.push(p);
			}
		}
		return names;
	},

	/**
	 * Set the value(s) of one or more properties. Arguments take two forms:
	 * (a) a single property name and value
	 * (b) an object of name-value pairs
	 * For each property specified, the object must actually have a non-Function
	 * property of that name or it will be ignored. If the property's value is a
	 * complex object with a 'type' property, then we try to find and instantiate
	 * an appropriate ModelObject subclass for it.
	 *
	 * @param {String|Object} nameOrPairs Either the name of the property, or an object holding
	 *        a set of property name-value pairs
	 * @param {Object} value The new value of the property, if the first argument was a String
	 */
	set : function(nameOrPairs, value) {
		switch(typeof nameOrPairs) {
			case "string":
				if(nameOrPairs in this && typeof this[nameOrPairs] != "function") {
					function toObject(o) {
						if(o && typeof o == "object" && o.type && _typesToClasses[o.type]) {
							return zomby.model.ModelObject.fromObject(o);
						} else if(zomby.Util.isArray(o)) {
							var arr = [];
							zomby.Util.each(o, function(it) {
								arr.push(toObject(it));
							});
							return arr;
						} else {
							return o;
						}
					}
					this[nameOrPairs] = toObject(value);
				}
				break;
			case "object":
				for(var p in nameOrPairs) {
					this.set(p, nameOrPairs[p]);
				}
				break;
			default:
				throw new Error("Argument must be a String or an Object");
		}
	},

	/**
	 * Create a deep copy of this model object.
	 * @return zomby.model.ModelObject
	 */
	clone : function() {
		return new this.constructor(this);
	},

	/**
	 * Serialize this ModelObject's non-function properties to a JSON-formatted string.
	 * @type String
	 */
	serialize : function() {
		return JSON.stringify(this);
	},

	getChanges : (function() { //branch up-front rather than on each call
		return useGettersAndSetters ?
			function() {
				return (this.getPrivate(changedPropsCache) || this.setPrivate(changedPropsCache, {}));
			} :
			function() {
				return this;
			};
	})(),

	resetChanges : (function() { //branch up-front rather than on each call
		return useGettersAndSetters ?
			function() {
				this.setPrivate(changedPropsCache, {});
			} :
			function() {};
	})()

},
/** @scope zomby.model.ModelObject */
{
	TYPE : null,

	/**
	 * Given a generic Object, create an appropriate ModelObject instance
	 * from it based on its declared type.
	 */
	fromObject : function(obj) {
		if(obj.type) {
			var cls = _typesToClasses[obj.type];
			if(cls) {
				return new cls(obj);
			}
		}
		return null;
	},

	/**
	 * Override base extend function to:
	 * - Keep a mapping of static TYPEs to classes; this allows fromObject() to
	 *   retrieve the appropriate class for a given model object type string.
	 * - Re-create each non-function property as a getter/setter pair, where the setter
	 *   is used to track property changes.
	 */
	extend : function(inst, stat) {
		var sub = Base.extend.call(this, inst, stat),
			proto = sub.prototype,
			t = stat && stat.TYPE,
			prop;

		if(t) {
			if(_typesToClasses[t]) throw new Error("ModelObject TYPE already defined: " + t);
			_typesToClasses[t] = sub;
		}

		if(useGettersAndSetters) {
			for(prop in proto) {
				(function(p) {
					if(proto.hasOwnProperty(p) && typeof proto[p] != "function") {
						var protoVal = proto[p];
						proto.__defineGetter__(p, function() {
							var v = this.getPrivate(p);
							return v !== undefined ? v : protoVal;
						});
						proto.__defineSetter__(p, function(v) {
							return this.setPrivate(p, (this.getChanges()[p] = v));
						});
					}
				})(prop);
			}
		}

		return sub;
	}
});

})();