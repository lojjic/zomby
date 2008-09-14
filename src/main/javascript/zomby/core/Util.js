zomby.core.Util = {

	rescope : function(fn, scope) {
		return function() {
			return fn.apply(scope, arguments);
		};
	},

	'each' : function( arr, fn ) {
		if(arr.length) {
			for(var i=0; i<arr.length; i++) {
				fn.call(arr[i], i, arr);
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