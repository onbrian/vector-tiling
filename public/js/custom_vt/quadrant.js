Quadrant.prototype.getSubQuadrants = function()
{
	// top right
	// x: [midX, maxX)
	// y: [minY, midY)
	var quadOne = new Quadrant(1, this.midX, this.maxX, this.minY, this.midY),

	// top left
	// x: [minX, midX)
	// y: [minY, midY)
		quadTwo = new Quadrant(2, this.minX, this.midX, this.minY, this.midY),

	// bottom left
	// x: [minX, midX)
	// y: [midY, maxY)
	    quadThree = new Quadrant(3, this.minX, this.midX, this.midY, this.maxY),

	// bottom right
	// x: [midX, maxX)
	// y: [midY, maxY)
	    quadFour = new Quadrant(4, this.midX, this.maxX, this.midY, this.maxY);

	return [quadOne, quadTwo, quadThree, quadFour];
}

// is point <p> inside this quadrant?
// defined as  minX <= p.x < maxX
//             minY <= p.y < maxY
Quadrant.prototype.insideQuadrant = function(p)
{
	// is x within range [min, max)?
	if (!(p[0] >= this.minX && p[0] < this.maxX))
	{
    	return false;
    }

	// is y within range [min, max)?
	if (!(p[1] >= this.minY && p[1] < this.maxY))
	{
		return false;
	}
	// (x, y) is in this quadrant
	return true;
}


// is point <p> inside this quadrant's x dimensions?
// defined as  minX <= p.x < maxX
Quadrant.prototype.insideQuadrantX = function(p)
{
	// is x within range [min, max)?
	if (!(p[0] >= this.minX && p[0] < this.maxX))
	{
    	return false;
    }
	return true;
}

// is point <p> inside this quadrant's y dimensions?
// defined as minY <= p.y < maxY
Quadrant.prototype.insideQuadrantY = function(p)
{
	// is y within range [min, max)?
	if (!(p[1] >= this.minY && p[1] < this.maxY))
	{
		return false;
	}
	return true;
}

// simple class representing a quadrant in a chart
function Quadrant(label, minX, maxX, minY, maxY)
{
	this.label = label;
	this.minX  = minX;
	this.maxX  = maxX;
	this.minY  = minY;
	this.maxY  = maxY;
	
	// compute midpoints
	this.midX  = (this.minX + this.maxX) / 2;
	this.midY  = (this.minY + this.maxY) / 2;
}