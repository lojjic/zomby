/**
 * @class A set of shape transformation properties.
 *
 * @constructor
 */
zomby.model.shape.property.Transform = zomby.model.shape.property.Property.extend(
/** @scope zomby.model.shape.property.Transform.prototype */
{
	/**
	 * Scale. 1 == native size.
	 */
	scale : 1,

	/**
	 * Rotation of the shape in degrees
	 */
	rotate : 0,

	/**
	 * Opacity. 0 == fully transparent, 1 == fully opaque
	 */
	opacity : 1

});