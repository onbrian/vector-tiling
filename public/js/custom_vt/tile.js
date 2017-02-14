/****************************************************************************/
/* TileLabel class */
/****************************************************************************/
TileLabel.prototype.getMaxParentLevel = function()
{
	return this.sequence.length - 1;
}

TileLabel.prototype.getLevel = function()
{
	return this.sequence.length - 1;
}

// return the sequence as a string
// can supply an optional <level> parameter that 
// specificies a parent sequence to return instead
TileLabel.prototype.toString = function(parentLevel = 0)
{
	// parent level too high -- tile doesn't exist
	if (parentLevel >= this.sequence.length)
		return null;

	return this.sequence.join('').substring(0, 
		(this.sequence.length - parentLevel));
}

TileLabel.prototype.getParentSeq = function(parentLevel = 1)
{
	if (parentLevel >= this.sequence.length)
		return null;
	return this.sequence.slice(0, this.sequence.length - parentLevel)

}

TileLabel.prototype.getChildSeq = function(quad)
{
	var childSeq = this.sequence.slice();
	childSeq.push(quad);
	return childSeq;
}

// <sequence> should be an integer array representing the 
// sequence of quadrants, starting with the base tile 
// needed to reach the tile for which this label applies
function TileLabel(sequence)
{
	this.sequence = sequence.slice();
}

/****************************************************************************/
/* Tile class */
/****************************************************************************/

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
		var subTileSeq = this.label.getChildSeq(i + 1);
		var subTile = new Tile(subTileSeq, newQuadrants[i], this.lines);
		subtiles.push(subTile);
	}
	return subtiles;
}

// a set of points and the quadrant that contains them
function Tile(sequence, quadrant, lines, linedRanked)
{
	this.label = new TileLabel(sequence);
	this.zoomLevel = sequence.length - 1;

	//this.points = points;
	this.quadrant = quadrant;

	// create own copy of each line
	this.lines = lines.slice();
	for (var i = 0, line = null; i < lines.length; i++)
	{	
		console.log(this.lines[i]);
		line = this.lines[i];
		/*
		line = Clip.clipLine(line, Geometry.X_AXIS, Geometry.intersectX,
						quadrant.minX, quadrant.maxX);
		*/
		line = Clip.softClipX(line, quadrant.minX, quadrant.maxX, true);
		console.log(line);
		//line = clipLine(line, Geometry.Y_AXIS, Geometry.intersectY,
		//				quadrant.minY, quadrant.maxY);
		this.lines[i] = line;
	}
}