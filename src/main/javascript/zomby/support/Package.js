/**
 * Create a "package" object into which a class may be created. If the package
 * objects already exist they will just be returned, otherwise they will be created.
 * @param {String} name The name of the package, e.g. "com.mydomain.myproj"
 */
function Package(name) {
	var levels = name.split("."),
		ctxt = window;
	for(var i=0; i<levels.length; i++) {
		var l = levels[i];
		if(!(l in ctxt)) {
			ctxt[l] = {};
		}
		ctxt = ctxt[l];
	};
	return ctxt;
};