/**
 * @class Abstract base class for SVG views of shapes
 * @extends zomby.view.svg.SvgView
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.svg.SvgView.extend({
	constructor : function(shape, parent) {
		this.base(shape, parent);
		this.transformView = new zomby.view.property.svg.TransformSvgView(shape.transform, this);
	},

	/**
	 * Create the view element for the shape. We wrap the actual shape element
	 * within a "g" container which gets positioned with a translate transform.
	 * @type Element
	 */
	create : function() {
		var g = this.createSVG("g"),
			s = this._shapeElement = this.createSVG(this.constructor.TAG);
		g.appendChild(s);
		return g;
	},

	/**
	 * Copy the given object's properties onto the shape element as attributes
	 * @param {Object} attrs
	 */
	setAttributes : function(attrs) {
		var el = this._shapeElement;
		for(var a in attrs) {
			var val = attrs[a];
			if(val === null) {
				el.removeAttribute(a);
			} else {
				el.setAttribute(a, attrs[a]);
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