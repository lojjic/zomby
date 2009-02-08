/**
 * @class Abstract base class for SVG views of shapes
 * @extends zomby.view.svg.SvgView
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.svg.SvgView.extend({
	constructor : function(shape, parent) {
		this.base(shape, parent);
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
		var el = this._shapeElement, trans;
		if(!el) {
			el = this._shapeElement = this.createSVG(this.getTagName());
			el.setAttribute( "transform", "translate(0,0) scale(1) rotate(0)" ); //initialize the 3-item SVGTransformList; is there a better way?
			trans = el.transform.baseVal;
			this._transforms = {
				translate : trans.getItem(0),
				scale : trans.getItem(1),
				rotate : trans.getItem(2)
			};
		}
		return el;
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
		for(var a in attrs) {
			this.setAttribute(a, attrs[a]);
		}
	},

	/**
	 * Set an attribute value on the shape's SVG element.
	 * @param {String} name - name of the attribute
	 * @param {String} value - value of the attribute; if null or undefined the attribute will be removed.
	 */
	setAttribute : function(name, value) {
		var el = this.getShapeElement();
		if(value == null) {
			el.removeAttribute(name);
		} else {
			el.setAttribute(name, value);
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
		var props = this.getChanges(),
			transform = this._transforms;

		if("x" in props || "y" in props) {
			transform.translate.setTranslate(props.x, props.y);
		}
		if("scale" in props) {
			transform.scale.setScale(props.scale, props.scale);
		}
		if("rotate" in props) {
			transform.rotate.setRotate(props.rotate, 0, 0);
		}

		if("opacity" in props) {
			this.setAttribute("opacity", props.opacity);
		}
	}
});