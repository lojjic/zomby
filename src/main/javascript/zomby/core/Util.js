
Package("zomby.core").Util = {

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
	}

};