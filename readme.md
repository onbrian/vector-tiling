

to do (now):
- research/add buffer for rendering


to do:
-stress testing zooming
	-- weird phenomenon, where line seems to "shrink" smaller and smaller
		--- see: lines = [[[0, 1], [2, 3]]], and zoom seq [0333333333333313](15)
	-- this is probably just a rounding issue: as you drill down, sig figs become 
	   more and more important. even rounding in the ten thousandths can be an issue.
	-- in this case, can't really avoid it -- just limit zooming level
	   in real world, use case wont need to rely on such significant figures anyway.


- add typechecking for certain constructors and functions
	- Tile constructor to make sure <sequence> is an array of integers
- handle edge cases for clipping/rendering (empty lines, single points for lines, etc.)
- handle empty tile (no more points) edge case in subtile function in tile.js/class
- unit test functions clip.js and geometry.js 
	- clipLine in clip.js
	- intersectX, intersectY, getMinCoordVal, getMaxCoordVal in geometry.js
- unit test minimum heap class (minHeap.js) -- all the protoype functions
- optimizations
	- optimize clipping along x-axis (assuming non-decreasing coordinates, can binary search)
	- optimize canvasjs re-rendering by maintaining references to chart.option.[objects] for updates
	- optimize clipping by adding bounding box?
	- optimize point retention for cached tiles -- only the highest zoomed tile retains original geometry (see blog)
		-- how to handle this when zooming out? 
	- optimize stripLine updates (directly manipulate existing one's value instead of replacing it)
