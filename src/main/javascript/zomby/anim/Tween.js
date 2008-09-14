/**
 * Tweening animation class. Defines a tween animation for a single property
 * on a single object, using an optional easing function.
 * @constructor
 * @param {Object} obj The object owning the property to be tweened
 * @param {String} prop The name of the property to be tweened
 * @param {Function} easing A function to use for easing. Optional, defaults to a standard
 *        linear animation. The easing function takes four Number arguments:
 *            fromFrame - the current frame of the animation
 *            fromValue - the beginning value of the property
 *            toValue - the target ending value of the property
 *            toFrame - the ending frame of the animation
 * @param {Number} start The beginning value of the property
 * @param {Number} finish The beginning value of the property
 * @param {Number} duration The duration of the animation; either in number of frames
 *        or in seconds, depending on the isSeconds argument
 * @param {Boolean} isSeconds If true, the duration argument will be interpreted as seconds
 */
zomby.anim.Tween = Base.extend(
/** @scope zomby.anim.Tween.prototype */
{
	FPS : zomby.core.Constants.DEFAULT_FPS,

	_playing : false,

	constructor : function(obj, prop, easing, start, finish, duration, isSeconds) {
		this.object = obj;
		this.property = prop;
		this.easing = easing || zomby.anim.easing.None.easeNone;
		this.start = start;
		this.finish = finish;
		this.duration = duration;
		this.isSeconds = isSeconds;
	},

	start : function() {
		this.position = 0;
		this.resume();
	},

	stop : function() {
		this._playing = false;
	},

	resume : function() {
		this._playing = true;
	},

	continueTo : function(toVal, duration) {
		this.finish = toVal;
	},

	fforward : function() {

	},

	nextFrame : function() {

	},

	preFrame : function() {

	},

	rewind : function() {

	},

	yoyo : function() {

	},

	onMotionChanged : null,
	onMotionFinished : null,
	onMotionResumed : null,
	onMotionStarted : null,
	onMotionStopped : null

});