zomby.Util = {

	rescope : function(fn, scope) {
		return function() {
			return fn.apply(scope, arguments);
		};
	},

	/**
	 * Iteration utility.
	 * @param {Array|Object} arr - The array (or array-like object) to iterate over
	 * @param {Function} fn - A function to be invoked for each iteration. Gets passed the following arguments:
	 *                   *) The current item in the array
	 *                   *) The current index (zero-based) of the iteration
	 *                   *) The array object itself
	 * @param {Object} thisObj - (optional) an object which will be used as the 'this' keyword in the callback function
	 */
	each : function( arr, fn, thisObj ) {
		if(arr && arr.length > 0) {
			//use built-in forEach if available (JS 1.6+) for performance boost
			if(arr instanceof Array && typeof typeof arr.forEach == "function") {
				arr.forEach(fn, thisObj);
			} else {
				for(var i=0, len=arr.length; i<len; i++) {
					fn.call(thisObj, arr[i], i, arr);
				}
			}
		}
	},

	/**
	 * Return a unique identifier for the given element. This is kept separate from
	 * the element's id attribute, since that may change and we want this to be constant.
	 * @param {Element} el
	 */
	generateId : (function() {
		var exp = "_zomby" + new Date().getTime();
		return function(el) {
			var id = el[exp];
			if(!id) {
				id = el[exp] = "zomby_id_" + new Date().getTime() + Math.random();
			}
			return id;
		}
	})()

};