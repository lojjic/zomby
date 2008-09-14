/**
 * Animation easing functions.
 * Each easing function takes the following Number arguments:
 *   c - the index (0-based) of the current frame in the animation
 *   s - the starting value
 *   e - the ending value
 *   t - the total number of frames in the animation
 */
zomby.anim.Easing = {

	linear : function(c, s, e, t) {
		return s + (e - s) * c / t;
	}

};