// clips a line between the two vertical lines
// x = <x1>, x = <x2>
// assumes that <x1> < <x2>
// assumes no backtracking (points are sorted by x-coordinate)
// optimize with binary search and bounding box
// need to handle single point case
function clipLineX(line, x1, x2)
{
	var OutBoundsEnum = {
		FALSE: 0,
		LEFT: 1,
		RIGHT: 2
	};

	// check if <val> is out of bounds with respect to <x1> and <x2>
	// returns appropriate enum value
	function checkBounds(val)
	{
		if (val < x1)
			return OutBoundsEnum.LEFT;
		else if (val > x2)
			return OutBoundsEnum.RIGHT;
		return OutBoundsEnum.FALSE;
	}

	var clippedLine = [];

	// edge cases

	// no points
	if (line.length === 0)
	{
		return clippedLine;
	}
	// single point
	else if (line.length === 1)
	{
		// single point is in bounds
		if (checkBounds(line[0]) === OutBoundsEnum.FALSE)
		{
			return line;
		}
		return clippedLine;
	}

	// at least two points... initiate algorithm
	for (var i = 0, prevInBounds = OutBoundsEnum.FALSE, 
			 p = null; i < line.length; i++)
	{
		p = line[i];

		var currInBounds = checkBounds(p[0])

		// initial case
		if (i == 0)
		{
			// in bounds, add point
			if (currInBounds === OutBoundsEnum.FALSE)
			{
				clippedLine.push(p);
			}
			prevInBounds = currInBounds;
			continue;
		}

		// normal case
		
		// in bounds
		if (currInBounds === OutBoundsEnum.FALSE)
		{
			// if prev point was out of bounds
			// add boundary intersection as well as this point
			// --|-->    | OR |     <--|--
			if (prevInBounds !== OutBoundsEnum.FALSE)
			{
				var boundary = prevInBounds === OutBoundsEnum.LEFT ? x1 : x2;
				// no need to add intersection if current point lies on boundary
				if (p[0] != boundary)
					clippedLine.push(Geometry.intersectX(line[i - 1], p, boundary));
			}

			// add point regardless of case
			clippedLine.push(p);
		}
		// current point out of bounds
		else
		{
			// prev point was in bounds
			// <--|--      | OR |     --|--> 
			if (prevInBounds === OutBoundsEnum.FALSE)
			{
				var boundary = currInBounds === OutBoundsEnum.LEFT ? x1 : x2;
				// no need to add intersection if prev point lies on boundary
				if (line[i - 1][0] != boundary)
					clippedLine.push(Geometry.intersectX(line[i - 1], p, boundary));
			}
			// prev point was out of bounds, but on other side/boundary
			// <--|-----|-- or --|-----|-->
			else if (prevInBounds !== currInBounds)
			{
				// add both intersections
				var boundary = prevInBounds === OutBoundsEnum.LEFT ? x1 : x2;
				clippedLine.push(Geometry.intersectX(line[i - 1], p, boundary));
				boundary = currInBounds === OutBoundsEnum.LEFT ? x1 : x2;
				clippedLine.push(Geometry.intersectX(line[i - 1], p, boundary));
			}
			// otherwise don't need to do anything if out of bounds on same side
		}
		prevInBounds = currInBounds;
	}
	return clippedLine;
}