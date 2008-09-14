/**
 * @class Abstract base class for SVG-element-based views
 * @extends zomby.view.ElementView
 *
 * @constructor
 * @param {zomby.model.ModelObject} shape The model object for which the view will be rendered
 * @param {Element} parent
 */
zomby.view.svg.SvgView = zomby.view.ElementView.extend(
/** @scope zomby.view.svg.SvgView.prototype */
{
	/**
	 * Create an SVG element with the given name
	 * @param {String} name The name of the SVG element
	 * @type SVGElement
	 */
	createSVG: function(name) {
		return document.createElementNS(zomby.core.Constants.SVG_NS, name);
	}
});