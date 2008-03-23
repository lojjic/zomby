

jQuery.rescope = function(fn, scope) {
	return function() {
		return fn.apply(scope, arguments);
	};
};