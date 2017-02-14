var CanvasHelper = (function()
{
	function initializeSqChart(elementID, chartLength, 
							   minX, maxX, intervalX, 
							   minY, maxY, intervalY, data)
	{
		var chart = new CanvasJS.Chart(elementID,
		{
			axisY: {
				minimum: minY,
				maximum: maxY,
				interval: intervalY,
				gridThickness: 1,
				gridDashType: "dash"
			},
			axisX: {
				minimum: minX,
				maximum: maxX, //+ 1, padding so number doesn't get cut off
				interval: intervalX,
				gridThickness: 1,
				gridDashType: "dash"
			},
			height: chartLength,
			width: chartLength,
			data: data,
		});
		return chart
	}

	// private helper function for rendering
	function getStripLineObject(val)
	{
		return {
			value: val,
			opacity: 0.5,
			thickness: 2,
			lineDashType: "dash",
			color: "#d89ef9"

		}
	}

	function tileToChart(elementID, chartLength, tile)
	{
		var q = tile.quadrant;
		var chart = new CanvasJS.Chart(elementID,
		{
			axisY: {
				minimum: q.minY,
				maximum: q.maxY,
				stripLines: [getStripLineObject((q.maxY + q.minY) / 2)],
				gridThickness: 0,
				//gridDashType: "dash",
				//labelMaxWidth: 30
			},
			axisX: {
				minimum: q.minX,
				maximum: q.maxX, //+ 1, padding so number doesn't get cut off
				stripLines: [getStripLineObject((q.maxX + q.minX) / 2)],
				gridThickness: 0,
				//gridDashType: "dash",
				//labelMaxWidth: 30
			},
			height: chartLength,
			width: chartLength,
			data: Transform.linesToCanvasObjects(tile.lines)
		});

		console.log(tile);
		return chart
	}

	function round(num)
	{
		return +num.toFixed(4);
	}

	// optimize by maintaining direct reference to chart.options.[axisY/axisX/data] later
	function renderTile(chart, tile)
	{
		// create new chart

		console.log(tile);
		var axisSettingsY = chart.options.axisY;
		var axisSettingsX = chart.options.axisX;

		// update y axis
		axisSettingsY.minimum = round(tile.quadrant.minY);
		axisSettingsY.maximum = round(tile.quadrant.maxY);
		axisSettingsY.stripLines = [getStripLineObject((tile.quadrant.maxY + tile.quadrant.minY)/2)];
		//axisSettingsY.interval = round((tile.quadrant.maxY - tile.quadrant.minY) / 2);

		// update x axis
		axisSettingsX.minimum = round(tile.quadrant.minX);
		axisSettingsX.maximum = round(tile.quadrant.maxX);
		axisSettingsX.stripLines = [getStripLineObject((tile.quadrant.maxX + tile.quadrant.minX)/2)];
		//axisSettingsX.interval = round((tile.quadrant.maxX - tile.quadrant.minX) / 2);

		chart.options.data = Transform.linesToCanvasObjects(tile.lines);
		chart.render();
	}

	return {
		initializeSqChart: initializeSqChart,
		tileToChart: tileToChart,
		renderTile: renderTile
	}

})();