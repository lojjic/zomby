(function() {

var _modelViewMapping = {};

/**
 }
 * @class A view of a model object.
 * 
 * @constructor
 * @param {zomby.model.ModelObject} modelObject The model object this view represents
 * @param {zomby.view.View} parentView The parent View object for this view, or null if top-level
 */
zomby.view.View = Base.extend(
/** @scope zomby.view.View.prototype */
{
	constructor : function(modelObject, parentView) {
		this.modelObject = modelObject;
		this.parentView = parentView;
	},

	/**
	 * Update the entire state of the view from the shape.
	 * Abstract; must be implemented by subclasses.
	 * @abstract
	 */
	update : function() {
	},

	/**
	 * Destroy the view instance, cleaning up any resources
	 */
	destroy : function() {
	}

}, {
	MODEL_CLASS : zomby.model.ModelObject,

	/**
	 * Create and return an appropriate View instance for the given ModelObject
	 * @param {zomby.model.ModelObject} model
	 * @param {zomby.view.View} parent
	 */
	forModelObject : function(model, parent) {
		if(model.type) {
			var cls = _modelViewMapping[model.type];
			if(cls) {
				return new cls(model, parent);
			}
		}
		return null;
	},

	/**
	 * Override the extend method for this and subclasses to maintain a mapping
	 * of model types to view classes. This allows #forModelObject to create the
	 * appropriate View for a given model object.
	 */
	extend : function(proto, stat) {
		var sub = Base.extend.call(this, proto, stat),
			c = stat && stat.MODEL_CLASS;
		if(c) {
			_modelViewMapping[c.TYPE] = sub;
		}
		return sub;
	}
});

})();