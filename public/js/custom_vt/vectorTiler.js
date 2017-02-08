function VectorTiler(lines)
{
	this.lines = lines;
	this.baseQuadrant = new Quadrant(0, Geometry.getMinCoordVal(Geometry.X_AXIS, lines),
										Geometry.getMaxCoordVal(Geometry.X_AXIS, lines),
										Geometry.getMinCoordVal(Geometry.Y_AXIS, lines),
										Geometry.getMaxCoordVal(Geometry.Y_AXIS, lines));
	this.baseTile = new Tile(this.baseQuadrant, lines);
}