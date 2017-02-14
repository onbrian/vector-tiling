var Simplify = (function()
{
	Triangle.prototype.computeArea = function()
	{
		this.area = Geometry.triangeArea(this.pLeft, this.p, this.pRight);
	}

	// simple constructor for triangle object
	// for use in VW algorithm
	function Triangle(i, pLeft, p, pRight)
	{
		// index of triangle in line
		this.i = i;
		this.pLeft = pLeft;
		this.p = p;
		this.pRight = pRight;
		this.area = Geometry.triangleArea(pLeft, p, pRight);
		// left neighbor
		this.nLeft = null;
		// right neighbor
		this.nRight = null;
	}

	// update triangle's position in min heap
	// useful if triangle's points have changed
	function updateTri(minheap, tri)
	{
		minheap.remove(tri);
		tri.computeArea();
		minheap.push(tri);
	}

	// when removing a point associated w min triangle area
	// update areas and positions of neighboring triangles in min heap
	function updateNeighbors(minheap, tri)
	{
		// update left neighbor if necessary
		var leftNeighbor = tri.nLeft;
		if (leftNeighbor !== null)
		{
			// left neighbor's right point is now <tri>'s right point
			leftNeighbor.pRight = tri.pRight;
			// remove neighbor, recompute area, push
			updateTri(leftNeighbor);

		}

		// update right neighbor if necessary
		var rightNeighbor = tri.nRight;
		if (rightNeighbor !== null)
		{
			// right neighbor's left point is now <tri>'s left point
			rightNeighbor.pLeft = tri.pLeft;
			// remove neighbor, recompute area, push
			updateTri(rightNeighbor);
		}

		// update neighbor links

		// both neighbors exist
		if (leftNeighbor !== null && rightNeighbor !== null)
		{
			leftNeighbor.right = rightNeighbor;
			rightNeighbor.left = leftNeighbor;
		}
		// only left neighbor exists
		else if (leftNeighbor !== null)
			leftNeighbor.right = null;
		// only right neighbor exists
		else if (rightNeighbor !== null)
			rightNeighbor.left = null;

		return;
	}

	// use Visvalingam-Whyatt algorithm to rank points in line
	// for dynamic simplification
	function VisvalWhyattRank(line)
	{
		// points sorted by area
		var rankedPoints = [];

		// end points cannot be deleted
		line[0].push(Infinity);
		line[line.length - 1].push(Infinity);

		// min priority queue to store points/triangles in order of area
		var minHeap = new MinHeap(function(a, b)
			{
				return a.area - b.area;
			});

		// initialize triangles for points in line
		for (var i = 1, prevTri = null, currTri = null; i < line.length - 1; i++)
		{
			currTri = new Triangle(i, line[i - 1], line[i], line[i + 1]);
			// set neighbors if not first triangle
			if (prevTri !== null)
			{
				currTri.left = prevTri;
				prevTri.right = currTri;
			}

			// add new triangle to min heap
			minHeap.push(currTri);
			// update prev triangle
			prevTri = currTri;
		}

		// all triangles are now in priority queue... now pop them off by area
		var tri = null;
		var effectiveArea = null;
		while (minHeap.getLength() > 0)
		{
			tri = minHeap.pop();
			// effective area is maximum(previous triangle's area + 1, current triangle area)
			effectiveArea = (effectiveArea !== null) 
							&& (effectiveArea >= tri.area) ? (effectiveArea + 1) : tri.area;

			line[tri.i].push(effectiveArea);
			rankedPoints.push(line[tri.i]);
			updateNeighbors(minHeap, tri);
		}
		return rankedPoints;
	}

	return {
		VisvalWhyattRank: VisvalWhyattRank
	};
})();