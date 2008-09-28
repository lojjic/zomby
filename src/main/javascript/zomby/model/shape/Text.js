(function() {
	var pkg = zomby.model.shape,

		TextBase = pkg.Fillable.extend({
			font : null,
			constructor : function(props) {
				this.base(props);
				this.font = new zomby.model.property.Font(props.font);
			}
		}),

		Span = TextBase.extend({
			parts : null,
			constructor : function(props) {
				this.base(props);
				var p = this.parts = [];
				zomby.Util.each(props.parts, function(o) {
					p.push(typeof o == "string" ? o : new Span(o))
				}, this);
			}
		}),

		Line = Span.extend({});

	/**
	 * A text shape, which may contain one or more lines and/or
	 * be anchored to a Path.
	 */
	pkg.Text = TextBase.extend({

		align : "start",
		lineHeight : 20,
		lines : null,
		path : null,

		constructor : function(props) {
			this.base(props);
			var l = this.lines = [];
			zomby.Util.each(props.lines, function(o) {
				l.push(new Line(o));
			}, this);
		}

	}, {
		TYPE : "text",

		Align : {
			START : "start",
			MIDDLE : "middle",
			END : "end"
		},

		Span : Span,

		Line : Line
	});

})();