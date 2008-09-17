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
			d = ["M 0 0"];
		zomby.Util.each(m.segments, function(seg) {
			d.push(seg.join(' '));
		});
		if(m.closed) {
			d.push('Z');
		}
		this.setAttributes({d : d.join(' ').toUpperCase()});
	}
}, {
	TAG : "path",
	MODEL_CLASS : zomby.model.shape.Path
});