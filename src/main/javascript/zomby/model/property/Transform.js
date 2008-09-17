/**
 * @class A set of shape transformation properties.
 *
 * @constructor
 */
zomby.model.property.Transform = zomby.model.property.Property.extend(
/** @scope zomby.model.property.Transform.prototype */
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