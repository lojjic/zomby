/**
 * @class Layer of a timeline.
 *
 * @constructor
 */

zomby.model.Layer = zomby.model.ModelObject.extend(
/** @scope zomby.model.Layer.prototype */
{
	shapes : null,

	constructor : function(props, timeline) {
		this.base(props);
		this.timeline = timeline;
	},

	/**
	 * Get a Shape object by its index.
	 * @param {Number} idx The index of the desired shape
	 */
	getShape: function(idx) {
		var CACHE_PROP = "_realShape_" + idx,
			me = this,
			s = me.getPrivate(CACHE_PROP);
		if( !s ) {
			s = me.getInitialShape(idx).clone();
			me.setPrivate(CACHE_PROP, s);
		}
		return s;
	},

	/**
	 * Reset a single shape to its initial defined state
	 * @param {Number} idx
	 */
	resetShape : function(idx) {
		var shape = this.getPrivate("_realShape_" + idx),
			initial = this.getInitialShape(idx);

		function copyRecursive(from, to) {
			var p, fromVal, toVal, fromType;
			for(p in from) {
				fromVal = from[p];
				toVal = to[p];
				fromType = typeof fromVal;
				if(toVal && typeof toVal === fromType && fromType === "object") {
					copyRecursive(fromVal, toVal);
				}
				else if(fromType !== "function") {
					to[p] = fromVal;
				}
			}
		}

		copyRecursive(initial, shape);
	},

	/**
	 * Reset all shapes to their initial defined states
	 */
	resetShapes : function() {
		for(var i=0, len=this.shapes.length; i<len; i++) {
			this.resetShape(i);
		}
	},

	/**
	 * Get a Shape object in its initial state. If the shape refers to a library
	 * object ("lib:{num}"), it will be defererenced to a clone of that library object.
	 * Be careful not to modify any properties of the returned object!
	 * @param {Number} idx The index of the desired shape
	 */
	getInitialShape: function(idx) {
		var CACHE_PROP = "_initialShape_" + idx,
			me = this,
			s = me.getPrivate(CACHE_PROP);
		if(!s) {
			s = me.shapes[idx];
			if(typeof s === "string" && s.indexOf("lib:") === 0) {
				s = s.substring(4);
				s = me.timeline.library.get(s);
				me.setPrivate(CACHE_PROP, s);
			}
		}
		return s;
	}
});
