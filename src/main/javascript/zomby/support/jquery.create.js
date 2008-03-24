

jQuery.create = function(ns, tag) {
	return jQuery(
		tag ?
			document.createElementNS(ns, tag) :
			document.createElement(ns)
	);
};