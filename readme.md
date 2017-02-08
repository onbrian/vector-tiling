to do:
- handle edge cases for clipping/rendering (empty lines, single points for lines, etc.)
- unit test functions clip.js and geometry.js 
	- clipLine in clip.js
	- intersectX, intersectY, getMinCoordVal, getMaxCoordVal in geometry.js
- optimize clipping along x-axis (assuming non-decreasing coordinates, can binary search)
- optimize canvasjs re-rendering by maintaining references to chart.option.[objects] for updates
