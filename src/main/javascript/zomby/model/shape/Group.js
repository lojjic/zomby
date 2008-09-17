/**
 * @class A group of shapes, positionable and transformable as a single unit
 * @extends zomby.model.shape.Shape
 */
zomby.model.shape.Group = zomby.model.shape.Shape.extend(
/** @scope zomby.model.shape.Group.prototype */
{
	shapes : null,

	constructor : function(props) {
		this.base(props);
		this.shapes = [];
		var s = props.shapes;
		if(s) {
			zomby.Util.each(s, function(shape) {
				this.shapes.push(zomby.model.ModelObject.fromObject(shape));
			}, this);
		}
	},

	addShape : function(shape) {
		this.shapes.push(shape);
	}
}, {
	TYPE : "group"
});