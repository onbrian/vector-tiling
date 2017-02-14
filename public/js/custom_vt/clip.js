// clips a line between the two vertical lines
// x = <x1>, x = <x2>
// assumes that <x1> < <x2>
// assumes no backtracking (points are sorted by x-coordinate)
// optimize with binary search and bounding box
// need to handle single point case

var Clip = (function()
{
	// clips line <line> between two lines parallel to axis <axis>
	// the two lines are represented by intercepts <x1> and <x2>
	// "new" points are added at line-border intersections, if any, to preserve line shape
	function clipLine(line, axis, intersect, x1, x2)
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

		// edge cases

		// no points
		if (line.length === 0)
		{
			return [];
		}
		
		// single point
		else if (line.length === 1)
		{
			// single point is in bounds
			if (checkBounds(line[0][axis]) === OutBoundsEnum.FALSE)
			{
				return [];
			}
			return [];
		}

		var clippedLine = [];

		// at least two points... initiate algorithm
		for (var i = 0, prevInBounds = OutBoundsEnum.FALSE, 
				 p = null, clippedLine = []; i < line.length; i++)
		{
			p = line[i];

			var currInBounds = checkBounds(p[axis])

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
					if (p[axis] != boundary)
						clippedLine.push(intersect(line[i - 1], p, boundary));
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
					if (line[i - 1][axis] != boundary)
						clippedLine.push(intersect(line[i - 1], p, boundary));


					// add line segment and start new one
					/*clippedLines.push(clippedLine);
					clippedLine = [];*/
				}
				// prev point was out of bounds, but on other side/boundary
				// <--|-----|-- or --|-----|-->
				else if (prevInBounds !== currInBounds)
				{
					// add both intersections
					var boundary = prevInBounds === OutBoundsEnum.LEFT ? x1 : x2;
					clippedLine.push(intersect(line[i - 1], p, boundary));
					boundary = currInBounds === OutBoundsEnum.LEFT ? x1 : x2;
					clippedLine.push(intersect(line[i - 1], p, boundary));
					
					// add line segment and start new one
					/*
					clippedLines.push(clippedLine);
					clippedLine = [];*/
				}
				// otherwise don't need to do anything if out of bounds on same side
			}
			prevInBounds = currInBounds;
		}
		/*
		if (clipLine.length > 0)
			clippedLines.push(clippedLine);
		*/
		return clippedLine;
	}

	// optimize with binary search, quick check later
	// "soft" clips <line> between 2 y-axis parallel lines <x1>, <x2>
	// where <x1> < <x2>
	// soft clip means new intersections points aren't generated
	// points on line are included simply if they are between the lines
	// <includeOutliers> specifies whether to include 2 points just outside 
	// border
	// assumes x-coordinates in <line> are non-decreasing
	function softClipX(line, x1, x2, includeOutliers = true)
	{
		// no solution: |        | --------
		if (line[0] > x2) return [];
		// no solution ------- |        |
		if (line[line.length - 1] < x1) return [];

		// some points are in bounds

		var startIndex = -1,
			stopIndex = -1;

		for (var i = 0, p = null; i < line.length; i++)
		{
			currX = line[i][0];
			
			// index of first point in bounds (if one exists)
			if (currX > x1 && startIndex < 0)
				startIndex = i;

			// index of first point out of bounds (on <x2> side)
			if (currX > x2)
			{
				stopIndex = i;
				break;
			}
		}

		startIndex = includeOutliers && (startIndex > 0) 
					 ? startIndex - 1 : startIndex;
		
		// edge case: some points are in bounds
		// but no points are past <x2> (on right side)
		if (stopIndex < 0)
			return line.slice(startIndex);
		return line.slice(startIndex, stopIndex + 1);
	}


	return {
		clipLine: clipLine,
		softClipX: softClipX,
	}

})();

