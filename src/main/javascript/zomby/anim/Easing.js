/**
 * Animation easing functions.
 * Each easing function takes the following Number arguments:
 *   t - 'time' the index of the current frame
 *   b - 'begin' the starting value
 *   c - 'change' the change in value between the start and end
 *   d - 'duration' the total number of frames in the animation
 *
 * These are ripped straight from the jQuery Easing plugin
 */
(function() {
	var M = Math,
		pi = M.PI,
		sin = M.sin,
		cos = M.cos,
		pow = M.pow,
		sqrt = M.sqrt,
		abs = M.abs,
		asin = M.asin,
		undef = undefined,

	Easing = zomby.anim.Easing = {
		linear: function( t, b, c, d ) {
			return b + c * t / d;
		},
		swing: function( t, b, c, d ) {
			return ((-cos(t / d * pi) / 2) + .5) * c + b;
		},
		inQuad: function (t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		outQuad: function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		inOutQuad: function (t, b, c, d) {
			return ((t/=d/2) < 1) ? c/2*t*t + b : -c/2 * ((--t)*(t-2) - 1) + b;
		},
		inCubic: function (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		outCubic: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		inOutCubic: function (t, b, c, d) {
			return ((t/=d/2) < 1) ? c/2*t*t*t + b : c/2*((t-=2)*t*t + 2) + b;
		},
		inQuart: function (t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		outQuart: function (t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		inOutQuart: function (t, b, c, d) {
			return ((t/=d/2) < 1) ? c/2*t*t*t*t + b : -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		inQuint: function (t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		outQuint: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		inOutQuint: function (t, b, c, d) {
			return ((t/=d/2) < 1) ? c/2*t*t*t*t*t + b : c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		inSine: function (t, b, c, d) {
			return -c * cos(t/d * (pi/2)) + c + b;
		},
		outSine: function (t, b, c, d) {
			return c * sin(t/d * (pi/2)) + b;
		},
		inOutSine: function (t, b, c, d) {
			return -c/2 * (cos(pi*t/d) - 1) + b;
		},
		inExpo: function (t, b, c, d) {
			return (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b;
		},
		outExpo: function (t, b, c, d) {
			return (t==d) ? b+c : c * (-pow(2, -10 * t/d) + 1) + b;
		},
		inOutExpo: function (t, b, c, d) {
			return t==0 ? b : t==d ? b+c :
					(t/=d/2) < 1 ? c/2 * pow(2, 10 * (t - 1)) + b :
					c/2 * (-pow(2, -10 * --t) + 2) + b;
		},
		inCirc: function (t, b, c, d) {
			return -c * (sqrt(1 - (t/=d)*t) - 1) + b;
		},
		outCirc: function (t, b, c, d) {
			return c * sqrt(1 - (t=t/d-1)*t) + b;
		},
		inOutCirc: function (t, b, c, d) {
			return ((t/=d/2) < 1) ? -c/2 * (sqrt(1 - t*t) - 1) + b : c/2 * (sqrt(1 - (t-=2)*t) + 1) + b;
		},
		inElastic: function (t, b, c, d) {
			var s=1.70158, p=0, a=c;
			if (t==0) return b;
			if ((t/=d)==1) return b+c;
			if (!p) p=d*.3;
			if (a < abs(c)) { a=c; s=p/4; }
			else s = p/(2*pi) * asin (c/a);
			return -(a*pow(2,10*(t-=1)) * sin( (t*d-s)*(2*pi)/p )) + b;
		},
		outElastic: function (t, b, c, d) {
			var s=1.70158, p=0, a=c;
			if (t==0) return b;
			if ((t/=d)==1) return b+c;
			if (!p) p=d*.3;
			if (a < abs(c)) { a=c; s=p/4; }
			else s = p/(2*pi) * asin (c/a);
			return a*pow(2,-10*t) * sin( (t*d-s)*(2*pi)/p ) + c + b;
		},
		inOutElastic: function (t, b, c, d) {
			var s=1.70158, p=0, a=c;
			if (t==0) return b;
			if ((t/=d/2)==2) return b+c;
			if (!p) p=d*(.3*1.5);
			if (a < abs(c)) { a=c; s=p/4; }
			else s = p/(2*pi) * asin (c/a);
			return (t < 1) ? -.5*(a*pow(2,10*(t-=1)) * sin( (t*d-s)*(2*pi)/p )) + b : a*pow(2,-10*(t-=1)) * sin( (t*d-s)*(2*pi)/p )*.5 + c + b;
		},
		inBack: function (t, b, c, d, s) {
			if (s == undef) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		outBack: function (t, b, c, d, s) {
			if (s == undef) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		inOutBack: function (t, b, c, d, s) {
			if (s == undef) s = 1.70158;
			return ((t/=d/2) < 1) ? c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b : c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		inBounce: function (t, b, c, d) {
			return c - Easing.outBounce (d-t, 0, c, d) + b;
		},
		outBounce: function (t, b, c, d) {
			return ((t/=d) < (1/2.75)) ? c*(7.5625*t*t) + b :
					(t < (2/2.75)) ? c*(7.5625*(t-=(1.5/2.75))*t + .75) + b :
					(t < (2.5/2.75)) ? c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b :
					c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		},
		inOutBounce: function (t, b, c, d) {
			return (t < d/2) ? Easing.inBounce (t*2, 0, c, d) * .5 + b : Easing.outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	};
})();