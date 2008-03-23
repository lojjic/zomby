

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