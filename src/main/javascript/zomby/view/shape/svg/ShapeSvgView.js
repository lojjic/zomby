Package("zomby.view.shape.svg");

/**
 * @class Abstract base class for views of shapes
 * @extends zomby.view.shape.ShapeView
 *
 * @constructor
 * @param {zomby.model.shape.Shape} shape The Shape object for which the view will be rendered
 * @param {Element} parent
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.shape.ShapeView.extend(
/** @scope zomby.view.shape.svg.ShapeSvgView.prototype */
{
	/**
	 * Create an SVG element with the given name
	 * @param {String} name The name of the SVG element
	 * @type SVGElement
	 */
	createSVG: function(name) {
		return document.createElementNS(zomby.core.Constants.SVG_NS, name);
	},

	/**
	 * Copy the given object's properties onto the SVG element as attributes
	 * @param {Object} attrs
	 */
	setAttributes : function(attrs) {
		for(var a in attrs) {
			this.getElement().setAttribute(a, attrs[a]);
		}
	}
});