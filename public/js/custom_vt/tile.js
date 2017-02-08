// a tile is a collection of points
// it contains a function that can be called to subtile into 4 more regions

Tile.prototype.subtile = function()
{
	// temp guard for empty tiles
	// no points -- can't drill down any further
	if (this.lines.length === 0)
	{
		console.log("empty!");
		return [this, this, this, this];
	}

	var subtiles = [];
	// compute new quadrants for each subtile
	var newQuadrants = this.quadrant.getSubQuadrants();
	// iterate through all points and divide into quadrants
	for (var i = 0; i < 4; i++)
	{
		var subTile = new Tile(newQuadrants[i], this.lines);
		subtiles.push(subTile);
	}
	return subtiles;
}

// a set of points and the quadrant that contains them
function Tile(quadrant, lines)
{
	//this.points = points;
	this.quadrant = quadrant;

	// create own copy of each line
	this.lines = lines.slice();
	for (var i = 0, line = null; i < lines.length; i++)
	{	
		line = this.lines[i];
		line = clipLine(line, Geometry.X_AXIS, Geometry.intersectX,
						quadrant.minX, quadrant.maxX);
		line = clipLine(line, Geometry.Y_AXIS, Geometry.intersectY,
						quadrant.minY, quadrant.maxY);
		this.lines[i] = line;
	}
}