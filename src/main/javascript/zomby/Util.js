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
	})(),

	/**
	 * Retrieve a remote JSON document and parse it into a Javascript object.
	 * @param {String} url - The URL of the JSON document
	 * @param {Function} callback - A function to be called when the JSON has completed loading and
	 *                   been parsed; will be passed one argument which is the result JS object
	 */
	getJSON : function(url, callback) {
		var opts = {
			method : "GET",
			url : url,
			async : true,
			success : function(data) {
				callback(JSON.parse(data.responseText));
			}
		};
		zomby.Util.getUrl(opts);
	},

	/**
	 * Retrieve a remote file
	 * @param {String} url - The URL of the JSON document
	 * @param {Object} opts - Object holding options for the request. Recognized properties:
	 *                 - {String} method - either "GET" or "POST", defaults to GET
	 *                 - {String} url - required; the url of the request
	 *                 - {Boolean} async - if true then the request will be made asynchronously, defaults to false
	 *                 - {String} username - optional username for authentication
	 *                 - {String} password - optional password for authentication
	 *                 - {Function} success - a function to be called upon successful response.  Passed one argument
	 *                              which is the XMLHttpRequest object.
	 *                 - {Function} error - a function to be called if the request errors out. If not supplied then an
	 *                              exception will be thrown instead. Passed one argument which is the XMLHttpRequest object.
	 */
	getUrl : function(opts) {
		var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					opts.success(xhr);
				} else {
					if(opts.error) {
						opts.error(xhr);
					} else {
						throw xhr;
					}
				}
			}
		};

		xhr.open(opts.method || "GET", opts.url, opts.async, opts.username, opts.password);
		xhr.send();
	}

};