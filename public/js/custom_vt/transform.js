var Transform = (function()
{
	function segmentToCanvasObject(segment)
	{
		var segmentData = [];
		var canvasObject = {
			type: "line", 
			dataPoints: segmentData
		};
		for (var i = 0; i < segment.length; i++)
		{
			segmentData.push({x: segment[i][0], y: segment[i][1]})
		}
		return canvasObject;
	}

	function linesToCanvasObjects(line)
	{
		var segments = [];	
		for (var i = 0; i < line.length; i++)
		{
			segments.push(segmentToCanvasObject(line[i]));
		}
		return segments;
	}


	return {
		segmentToCanvasObject: segmentToCanvasObject,
		linesToCanvasObjects: linesToCanvasObjects
	}
})();