Package("zomby.model");

/**
 * @class Base class for model objects. Provides convenience get and set methods for
 *        manipulating properties by name, and an onpropertychange event object to
 *        which other objects can subscribe to monitor changes.
 *
 * @constructor
 * @param {Object} props (optional) Name-value pairs for the object's initial property
 *        values. Note that setting properties up-front like this will not give any
 *        potential consumers an opportunity to attach to the onpropertychange events
 *        before the initial properties are set.
 */
zomby.model.ModelBase = Base.extend(
/** @scope zomby.model.Transform.prototype */
{
	constructor : function(props) {
		this.base();
		this.initProps(props);

		/**
		 * Event listener object for property change events. Subscribed functions
		 * will be passed a {@link zomby.model.PropertyChangeEventData} object.
		 */
		this.onpropertychange = new zomby.core.Event("propertychanged");
	},

	initProps : function(props) {
		for(var p in props) {
			this.set(p, props[p]);
		}
	},

	/**
	 * Get a named property's value. The object must actually have a non-Function
	 * property of that name or an error will be thrown.
	 *
	 * @param {String} name The name of the property
	 */
	get : function(name) {
		if(!(name in this) || $.isFunction(this[name])) {
			throw new Error("Tried to get unknown property '" + name + "'");
		}
		return this[name];
	},

	/**
	 * Set a named property's value. The object must actually have a non-Function
	 * property of that name or an error will be thrown. Calling this method will
	 * fire a propertychanged event with the name of the property and its old and
	 * new values; consumers can listen for these events by subscribing to this.onpropertychange.
	 *
	 * @param {String} name The name of the property
	 * @param {Object} value The new value of the property
	 */
	set : function(name, value) {
		if(!(name in this) || $.isFunction(this[name])) {
			throw new Error("Tried to set unknown property '" + name + "'");
		}
		var old = this[name];
		this[name] = value;
		this.onpropertychange.fire(new zomby.model.PropertyChangeEventData(name, old, value, this));
	}

});