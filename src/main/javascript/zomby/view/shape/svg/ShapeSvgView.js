/**
 * @class Abstract base class for SVG views of shapes
 * @extends zomby.view.svg.SvgView
 */
zomby.view.shape.svg.ShapeSvgView = zomby.view.svg.SvgView.extend({
	constructor : function(shape, parent) {
		this.base(shape, parent);
	},

	/**
	 * Create the view element for the shape. We set up a three-element transform consisting
	 * of a translate, followed by a scale, followed by a rotate. These transforms are then
	 * accessed via the SVG DOM in the update method to modify them individually.
	 * @type Element
	 */
	create : function() {
		var el = this.createSVG(this.getTagName()), trans;
		el.setAttribute( "transform", "translate(0,0) scale(1) rotate(0)" ); //initialize the 3-item SVGTransformList; is there a better way?
		if((trans = el.transform) && (trans = trans.baseVal)) {
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
		var el = this.getElement();
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
		var defs = this._defs, svgEl;
		if(!defs) {
			svgEl = this.getElement().ownerSVGElement;
			defs = svgEl.getElementsByTagName("defs")[0];
			if(!defs) {
				svgEl.appendChild(
					defs = this._defs = this.createSVG("defs")
				);
			}
		}
		return defs;
	},

	update : function() {
		this.base();
		var props = this.getChanges(),
			transform = this._transforms, m;

		if("x" in props || "y" in props) {
			m = this.modelObject;
			transform.translate.setTranslate(m.x, m.y);
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
