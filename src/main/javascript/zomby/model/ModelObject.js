(function() {

var _typesToClasses = {},
	useGettersAndSetters = (typeof _typesToClasses.__defineSetter__ === "function");

/**
 * For a given ModelObject instance, create methods for accessing/setting
 * private data. The data is stored locally in a closure so it is completely
 * invisible to other objects and even other methods of this object. The method
 * creation is done lazily on first access (see the stub methods in the
 * prototype below) to avoid unnecessary function creation in the constructor,
 * that way the object instantiation is still very fast.
 */
function initPrivateAccessMethods( instance ) {
	var privateData = {};
	instance.setPrivate = function(name, val) {
		return (privateData[name] = val);
	};
	instance.hasPrivate = function(name) {
		return (name in privateData);
	};
	instance.getPrivate = function(name) {
		return privateData[name];
	};
}


/**
 * @class Base class for model objects.
 *
 * @constructor
 * @param {Object} props (optional) Name-value pairs for the object's initial property values.
 */
zomby.model.ModelObject = zomby.Base.extend(
/** @scope zomby.model.ModelObject.prototype */
{
	type : null,
	label : null,

	constructor : function(props) {
		var me = this;
		me.base();
		me.type = me.constructor.TYPE;
		if(props) {
			me.set(props);
		}
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
			if(typeof p !== 'function') {
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
	set : (function() {
		function toObject(o) {
			var ret, arr;
			if(o && typeof o === "object" && o.type && _typesToClasses[o.type]) {
				ret = zomby.model.ModelObject.fromObject(o);
			} else if(zomby.Util.isArray(o)) {
				arr = [];
				zomby.Util.each(o, function(it) {
					arr.push(toObject(it));
				});
				ret = arr;
			} else {
				ret = o;
			}
			return ret;
		}

		return function(nameOrPairs, value) {
			switch(typeof nameOrPairs) {
				case "string":
					if(nameOrPairs in this && typeof this[nameOrPairs] !== "function") {
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
		};
	})(),
	
	/**
	 * Store a value under the given name in this object's private data.
	 * This is a stub method which lazily overwrites itself with the real
	 * implementation when first called.
	 * @param {String} name The private data member name
	 * @param {Object} value The private data member value
	 */
	setPrivate: function(name, value) {
		initPrivateAccessMethods(this);
		return this.setPrivate(name, value);
	},

	/**
	 * Determine if this object's private data contains a member with the given name.
	 * This is a stub method which lazily overwrites itself with the real
	 * implementation when first called.
	 * @param {String} name The private data member name
	 */
	hasPrivate: function(name) {
		initPrivateAccessMethods(this);
		return this.hasPrivate(name);
	},
	
	/**
	 * Retrieve a private data member value with the given name.
	 * This is a stub method which lazily overwrites itself with the real
	 * implementation when first called.
	 * @param {String} name The private data member name
	 */
	getPrivate: function(name) {
		initPrivateAccessMethods(this);
		return this.getPrivate(name);
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
				var prop = "_changedProps";
				return (this.getPrivate(prop) || this.setPrivate(prop, {}));
			} :
			function() {
				return this;
			};
	})(),

	resetChanges : (function() { //branch up-front rather than on each call
		return useGettersAndSetters ?
			function() {
				this.setPrivate("_changedProps", {});
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
		var cls, ret = null;
		if(obj.type) {
			cls = _typesToClasses[obj.type];
			if(cls) {
				ret = new cls(obj);
			}
		}
		return ret;
	},

	/**
	 * Override base extend function to:
	 * - Keep a mapping of static TYPEs to classes; this allows fromObject() to
	 *   retrieve the appropriate class for a given model object type string.
	 * - Re-create each non-function property as a getter/setter pair, where the setter
	 *   is used to track property changes.
	 */
	extend : function(inst, stat) {
		var sub = zomby.Base.extend.call(this, inst, stat),
			proto = sub.prototype,
			t = stat && stat.TYPE,
			prop, initGetSet;

		if(t) {
			if(_typesToClasses[t]) {
				throw new Error("ModelObject TYPE already defined: " + t);
			}
			_typesToClasses[t] = sub;
		}

		if(useGettersAndSetters) {
			initGetSet = function(proto, prop) {
				var protoVal;
				if(proto.hasOwnProperty(prop) && typeof (protoVal = proto[prop]) !== "function") {
					proto.__defineGetter__(prop, function() {
						var v = this.getPrivate(prop);
						return v !== undefined ? v : protoVal;
					});
					proto.__defineSetter__(prop, function(v) {
						return this.setPrivate(prop, (this.getChanges()[prop] = v));
					});
				}
			};
			for(prop in proto) {
				initGetSet(proto, prop);
			}
		}

		return sub;
	}
});

})();