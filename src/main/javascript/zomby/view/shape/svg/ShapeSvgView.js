/**
 * @class Abstract base class for SVG views of shapes
 * @extends zomby.view.svg.SvgView
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.svg.SvgView.extend({
	constructor : function(shape, parent) {
		this.base(shape, parent);
		this.transformView = shape.transform ? new zomby.view.property.svg.TransformSvgView(shape.transform, this) : null;
	},

	/**
	 * Create the view element for the shape. We wrap the actual shape element
	 * within a "g" container which gets positioned with a translate transform;
	 * positioning the element this way moves the origin point so further
	 * transforms e.g. rotate behave more sensibly.
	 * @type Element
	 */
	create : function() {
		var g = this.createSVG("g");
		g.appendChild(this.getShapeElement());
		return g;
	},

	/**
	 * Get the shape-specific SVG element, which is wrapped in the outer "g" element.
	 */
	getShapeElement : function() {
		return this._shapeElement || (this._shapeElement = this.createSVG(this.getTagName()));
	},

	/**
	 * Get the name of the SVG tag for the shape.
	 */
	getTagName : function() {
		return this.constructor.TAG;
	},

	/**
	 * Copy the given object's properties onto the shape element as attributes
	 * @param {Object} attrs
	 */
	setAttributes : function(attrs) {
		var el = this.getShapeElement();
		for(var a in attrs) {
			var val = attrs[a];
			if(val === null) {
				el.removeAttribute(a);
			} else {
				el.setAttribute(a, val);
			}
		}
	},

	/**
	 * Get a <defs/> element suitable for storing shape/gradient/etc. definitions
	 * for this view. The element is lazily created and inserted upon first access.
	 */
	getDefsElement : function() {
		if(!this._defs) {
			this.getElement().appendChild(
				this._defs = this.createSVG("defs")
			);
		}
		return this._defs;
	},

	update : function() {
		this.base();
		var m = this.modelObject;
		this.getElement().setAttribute("transform", "translate(" + m.x + "," + m.y + ")");
		this.transformView.update();
	}
});