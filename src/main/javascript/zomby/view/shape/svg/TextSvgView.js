(function() {

	var pkg = zomby.view.shape.svg,
	
		TextBaseView = pkg.FillableSvgView.extend({
			update : function() {
				this.base();
				var f = this.modelObject.font,
					v = this.fontView || (f && (this.fontView = new zomby.view.property.svg.FontSvgView(f, this)));
				if(v) {
					v.update();
				}
			}
		}),

		SpanView = TextBaseView.extend({
			/**
			 * Create the element; overridden to return a tspan element directly so
			 * it isn't wrapped in a g element like the base ShapeSvgView does.
			 */
			create : function() {
				var el = this.createSVG(this.getTagName());
				if(typeof this.modelObject == "string") {
					el.appendChild(document.createTextNode(""));
				}
				return el;
			},

			getShapeElement : function() {
				return this.getElement();
			},

			update : function() {
				var el = this.getElement();

				// If the model object is a plain string, set it as the text node
				if(typeof this.modelObject == "string") {
					// Note we don't call the superclass here since it's just text and therefore should
					// inherit everything from its parent model object and have no properties of its own.
					el.firstChild.nodeValue = this.modelObject;
				}
				// Otherwise update all the parts
				else {
					this.base();
					var parts = this.modelObject.parts,
						views = this.partViews || (this.partViews = []);

					// Update the part views, creating/deleting them as necessary
					zomby.Util.each(parts, function(p, i) {
						var pv = views[i];
						if(!pv || pv.modelObject !== p) {
							pv = new SpanView(p, this);
							el.insertBefore(pv.getElement(), views[i] ? views[i].getElement() : null);
							views.splice(i, 0, pv);
						}
						pv.update();
					}, this);
					while(views.length > parts.length) {
						views.pop().destroy();
					}
				}
			}
		}, {
			TAG : "tspan"
		}),

		LineView = SpanView.extend({
			getTagName : function() {
				return this.parentView.modelObject.path ? "textPath" : "tspan";
			},

			update : function() {
				this.base();
				var pv = this.parentView.pathView;
				if(pv) {
					this.getShapeElement().setAttributeNS(zomby.Constants.XLINK_NS, "href", "#" + zomby.Util.generateId(pv));
				}
			}
		});

	/**
	 * @class A SVG based view for a Text shape
	 * @extends zomby.view.shape.svg.FillableSvgView
	 */
	pkg.TextSvgView = TextBaseView.extend(
	/** @scope zomby.view.shape.svg.RectangleSvgView.prototype */
	{
		/**
		 * Update the view to match all aspects of its Text object
		 */
		update : function() {
			this.base();
			this.updatePath();

			var m = this.modelObject,
				views = this.lineViews || (this.lineViews = []);

			// Update the line views, creating/deleting them as necessary
			zomby.Util.each(m.lines, function(l, i) {
				var lv = views[i];
				if(!lv || lv.modelObject !== l) {
					lv = new LineView(l, this);
					this.getShapeElement().insertBefore(lv.getElement(), views[i] ? views[i].getElement() : null);
					views.splice(i, 0, lv);
				}
				lv.update();
				lv.getElement().setAttribute("x", 0);
				lv.getElement().setAttribute("y", m.lineHeight * i);
			}, this);
			while(views.length > m.lines.length) {
				views.pop().destroy();
			}

			this.setAttributes({
				"text-anchor" : m.align
			});
		},

		/**
		 * Update the text's path, if present
		 */
		updatePath : function() {
			var path = this.modelObject.path,
				v = this.pathView;
			if(path) {
				if(!v) {
					v = this.pathView = new pkg.PathSvgView(path, this);
					v.appendTo(this.getDefsElement());
					var id = zomby.Util.generateId(v);
					v.getShapeElement().setAttribute("id", id);
				}
				v.update();
			}
		}
	}, {
		TAG : "text",
		MODEL_CLASS : zomby.model.shape.Text
	});

})();