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

	// optimize by maintaining direct reference to chart.options.[axisY/axisX/data] later
	function renderTile(chart, tile)
	{
		console.log(tile);
		var axisSettingsY = chart.options.axisY;
		var axisSettingsX = chart.options.axisX;

		// update y axis
		axisSettingsY.minimum = tile.quadrant.minY;
		axisSettingsY.maximum = tile.quadrant.maxY;
		axisSettingsY.interval = (tile.quadrant.maxY - tile.quadrant.minY) / 2;

		// update x axis
		axisSettingsX.minimum = tile.quadrant.minX;
		axisSettingsX.maximum = tile.quadrant.maxX;
		axisSettingsX.interval = (tile.quadrant.maxX - tile.quadrant.minX) / 2;

		chart.options.data = Transform.linesToCanvasObjects(tile.lines);
		chart.render();
	}

	return {
		initializeSqChart: initializeSqChart,
		renderTile: renderTile
	}

})();