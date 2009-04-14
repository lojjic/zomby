/**
 * @class A custom event object. Objects may subscribe an event handler
 * function to be executed when the event fires.
 *
 * @constructor
 * @param {String} type The type of the event.
 */
zomby.core.Event = zomby.Base.extend(
/** @scope zomby.core.Event.prototype */
{
	type : null,
	listeners : null,

	constructor : function(type) {
		this.type = type;
	},

	/**
	 * Subscribe an event listener function to receive notification when the event fires.
	 * @param {Function} fn A function to be called when the event fires. The function will
	 *        be called with one Object argument holding data appropriate for the type of event.
	 * @param {Object} [scope] An optional scope object; if supplied then this object will be
	 *        used as the 'this' keyword when the listener function is executed. If not supplied
	 *        then the listener will be executed in the global scope.
	 */
	subscribe : function(fn, scope) {
		(this.listeners || (this.listeners = [])).push({scope : scope || null, fn : fn});
	},

	/**
	 * Unsubscribe an event listener.
	 * @param {Function} fn The listener function to be unsubscribed.
	 */
	unsubscribe : function(fn) {
		this.listeners = $.grep(this.listeners, function(l) {
			return (fn !== l.fn);
		});
	},

	/**
	 * Fire the event.
	 * @param {Object} data An object holding arbitrary data for the event. The contents of
	 *        the object are dependent on the specific type of the event.
	 */
	fire : function(data) {
		if(this.listeners) {
			$.each(this.listeners, function() {
				this.fn.call(this.scope, data);
			});
		}
	}

});