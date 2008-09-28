
zomby.view.property.svg.FontSvgView = zomby.view.property.PropertyView.extend({

	update : function() {
		var m = this.modelObject;
		this.parentView.setAttributes({
			"font-family" : m.family,
			"font-style" : m.style,
			"font-variant" : m.variant,
			"font-weight" : m.weight,
			"font-stretch" : m.stretch,
			"font-size" : m.size,
			kerning : m.kerning,
			"letter-spacing" : m.letterSpacing,
			"word-spacing" : m.wordSpacing,
			"text-decoration" : m.decoration
		});
	}

});