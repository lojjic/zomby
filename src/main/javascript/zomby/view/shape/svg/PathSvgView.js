/**
 * @class A SVG based view for a Path shape
 * @extends zomby.view.shape.svg.FillableSvgView
 */
zomby.view.shape.svg.PathSvgView = zomby.view.shape.svg.FillableSvgView.extend(
/** @scope zomby.view.shape.svg.PathSvgView.prototype */
{
	/**
	 * Update the view to match all aspects of its Path object
	 */
	update : function() {
		this.base();
		var m = this.modelObject,
			s = m.segments,
			d = ["M 0 0"];
		for(var i=0, len=s.length; i<len; i++) {
			d.push(s[i].join(' '));
		}
		if(m.closed) {
			d.push('Z');
		}
		this.setAttributes({d : d.join(' ').toUpperCase()});
	}
}, {
	TAG : "path",
	MODEL_CLASS : zomby.model.shape.Path
});