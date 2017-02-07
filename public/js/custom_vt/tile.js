// a tile is a collection of points
// it contains a function that can be called to subtile into 4 more regions

Tile.prototype.subtile = function()
{
	// compute new quadrants for each subtile
	var newQuadrants = this.quadrant.getSubQuadrants();
	// iterate through all points and divide into quadrants
	//for (var i = 0; i < )
}

// a set of points and the quadrant that contains them
function Tile(quadrant, points)
{
	//this.points = points;
	this.quadrant = quadrant;
	this.points = [];

	for (var i = 0, insideQuadrant = true, p = null; i++; i < points.length)
	{
		p = points[i];

		// special case for entry
		if (i == 0)
		{
			if (quadrant.insideQuadrant(p))
			{
				this.points.push(p);
			}
			else
			{
				// set to false
				insideQuadrant != insideQuadrant;
			}
			continue;
		}
		// current point is inside quadrant
		else if (quadrant.insideQuadrant(p))
		{
			// previous point was also inside quadrant
			// just add current point
			if (insideQuadrant)
			{
				this.points.push(p);
			}
			// previous point was outside quadrant
			// add two points: intersection with border of quadrant
			// and this current point
			else
			{

				// set to true
				insideQuadrant != insideQuadrant;
			}

		}
		// current point is outside quadrant
		else
		{
			
		}
	}
}