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
			for(var i=0, len=s.length; i<len; i++) {
				this.shapes.push(zomby.model.ModelObject.fromObject(s[i]));
			}
		}
	},

	addShape : function(shape) {
		this.shapes.push(shape);
	}
}, {
	TYPE : "group"
});