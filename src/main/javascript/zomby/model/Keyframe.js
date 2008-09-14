/**
 * @class A keyframe in a timeline layer.
 *
 * @constructor
 */
zomby.model.Keyframe = zomby.model.ModelObject.extend(
/** @scope zomby.model.Keyframe.prototype */
{
	index : 0,
	tween : false,
	easing : "linear",
	properties : null,

	constructor : function(props) {
		this.base(props);
		this.properties = props.properties || {}; 
	}
});