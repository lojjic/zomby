
zomby.view.property.svg.FontSvgView = zomby.view.property.PropertyView.extend({
	update : (function() {
		var propsToAttrs = {
			family : "font-family",
			style : "font-style",
			variant : "font-variant",
			weight : "font-weight",
			stretch : "font-stretch",
			size : "font-size",
			kerning : "kerning",
			letterSpacing : "letter-spacing",
			wordSpacing : "word-spacing",
			decoration : "text-decoration"
		};

		return function() {
			this.base();
			var props = this.getChanges(),
				v = this.parentView,
				p;
			for(p in propsToAttrs) {
				if(p in props) {
					v.setAttribute(propsToAttrs[p], props[p]);
				}
			}
		};
	})()

});