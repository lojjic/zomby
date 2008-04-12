Package("zomby.model");

/**
 * @class Event data object for an onpropertychange event
 * @constructor
 * @param {String} name The name of the property being changed
 * @param {Object} oldValue The original, pre-change value of the property
 * @param {Object} newValue The new value of the property
 * @param {Object} target The target object whose property was changed
 */
zomby.model.PropertyChangeEventData = Base.extend(
/** @scope zomby.model.PropertyChangeEventData.prototype */
{
	constructor : function(name, oldValue, newValue, target) {
		this.name = name;
		this.oldValue = oldValue;
		this.newValue = newValue;
		this.target = target;
	}
});