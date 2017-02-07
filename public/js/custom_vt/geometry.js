// revealing module pattern to mimic class

// an object containing useful geometry functions
var Geometry = (function()
{
	// get the intersection between vertical line x=<x>
	// and the line defined by points <a> & <b> 
	var intersectX = function(a, b, x) 
	{
		// compute slope
		// m = (b[1] - a[1])/(b[0] - a[0])
		// compute b using point a
		// b = y - mx 
		//   = a[1] - m*a[0]
		// compute y
		// y = mx + a[1] - m*a[0]
		//   = mx - m*a[0] + a[1]
		//	 = m(x - a[0]) + a[1]
    	return [x, (x - a[0]) * (b[1] - a[1]) / (b[0] - a[0]) + a[1]];
	}

	// get the intersection between horizontal line y=<y>
	// and the line defined by points <a> & <b> 
	var intersectY = function(a, b, y)
	{
    	return [(y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]) + a[0], y];
	}
	
	return {
		intersectX: intersectX,
		intersectY: intersectY
	}
})();