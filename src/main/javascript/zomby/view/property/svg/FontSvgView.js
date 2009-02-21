
zomby.view.property.svg.FontSvgView = zomby.view.property.PropertyView.extend({

	updateProp : (function() {
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

		return function(name, val) {
			var attr = propsToAttrs[name];
			if(attr) {
				this.parentView.setAttribute(attr, val);
			}
		};
	})()

});