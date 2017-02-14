// get tile with label <label>
VectorTiler.prototype.getTile = function(label)
{
	var labelString = label.toString();

	console.log("VectorTiler: requested tile is " + label);

	// if tile exists, return it
	if (labelString in this.tileCache)
		return this.tileCache[labelString];

	// otherwise drill down, generate it, then return it

	// fetch lowest parent tile possible
	var parentTile = this.baseTile;
	
	// stopping 1 loop less than max level because max level contains only base tile
	for (var i = 1, parentLabelString = null; i < label.getMaxParentLevel(); i++)
	{
		parentLabelString = label.toString(i);
		if (parentLabelString in this.tileCache)
		{
			parentTile = this.tileCache[parentLabelString]
			break;
		}
	}

	// extract quadrant subsequence of zoom remaining
	var qSeqToZoom = label.sequence.slice(parentTile.label.sequence.length);

	// drill down from parent tile, caching all children tiles along the way
	while (qSeqToZoom.length > 0)
	{
		var currQuad = qSeqToZoom.shift();
		var subtiles = parentTile.subtile();

		// cache all tiles
		for (var i = 0; i < subtiles.length; i++)
		{
			var subtile = subtiles[i];
			this.tileCache[subtile.label.toString()] = subtile;
		}

		// update parent tile
		parentTile = subtiles[currQuad - 1];
	}

	return parentTile;
}

// delete tile with label <label> if it exists
VectorTiler.prototype.removeTile = function(label)
{
	return null;
}

// lines is a 3d array, where each 2d array represents a line in 2D euclidean space
// client must not manipulate its tiles or tilecache directly -- use the prototype functions
function VectorTiler(lines)
{
	// settings for vector tiling
	this.options = {
		// given 6 million points and the fact that canvas can handle 300k points
		// we don't really need to zoom that deeply -- 4^5 = 1024 is more than enough
		zoomLevel: 5
	};

	// all the lines on the graph
	this.lines = lines;

	// generate initial, bounding quadrant for all lines
	this.baseQuadrant = new Quadrant(0, Geometry.getMinCoordVal(Geometry.X_AXIS, lines),
										Geometry.getMaxCoordVal(Geometry.X_AXIS, lines),
										Geometry.getMinCoordVal(Geometry.Y_AXIS, lines),
										Geometry.getMaxCoordVal(Geometry.Y_AXIS, lines));
	
	// generate base tile
	this.baseTile = new Tile([0], this.baseQuadrant, lines);
	
	// initialize tile cache
	this.tileCache = {};
	this.tileCache[this.baseTile.label.toString()] = this.baseTile;
}
