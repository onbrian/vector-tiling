// given the height and width of a chart
// cut it up into four equal quadrants, each conventionally numbered 1-4
// and return
function getQuadrantDivisions(chartDim)
{
  var midWidth = chartDim.width / 2,
      midHeight = chartDim.height / 2;

  // top right
  // x: [250, 500)
  // y: [0, 250)
  var quadOne = {quad: 1, minX: midWidth, maxX: chartDim.width, 
                          minY: 0,        maxY: midHeight},
  // top left
  // x: [0, 250)
  // y: [0, 250)
      quadTwo = {quad: 2, minX: 0, maxX: midWidth, 
                          minY: 0, maxY: midHeight},

  // bottom left
  // x: [0, 250)
  // y: [250, 500)
      quadThree = {quad: 3, minX: 0,         maxX: midWidth, 
                            minY: midHeight, maxY: chartDim.height},

  // bottom right
  // x: [250, 500)
  // y: [250, 500)
      quadFour = {quad: 4, minX: midWidth,  maxX: chartDim.width, 
                           minY: midHeight, maxY: chartDim.height};

  return [quadOne, quadTwo, quadThree, quadFour];
}

// is a point with coordinates (<x>, <y>)
// in the quadrant represented by the quadrant object <quadrant>?
function inQuadrant(quadrant, x, y)
{

  // is x within range [min, max)?
  if (!(x >= quadrant.minX && x < quadrant.maxX))
  {
    return false;
  }

  // is y within range [min, max)?
  if (!(y >= quadrant.minY && y < quadrant.maxY))
  {
    return false;
  }
  // (x, y) is in this quadrant
  return true;
}

// load Google Charts API
google.charts.load('current', {'packages':['corechart']});

// callback to drawchart
// uses closure to accept data as arguments
function drawChart(data1, data2)
{
  var chartDimensions = {width: 500, height: 500};
  var quadrants = getQuadrantDivisions(chartDimensions);

  var options = {
    title: 'Simulation via ',
    hAxis: {title: 'Pixel Depth', minValue: 0, maxValue: 40},
    vAxis: {title: 'Cloud Cores', minValue: 0, maxValue: 40},
    legend: {position: 'none'},
    width: chartDimensions.width,
    height: chartDimensions.height,
    chartArea: {left: 0, top: 0, width: '100%', height: '100%'}
  };

  return function() 
  {
    function clickHandler(e)
    {
      var x = e.x,
          y = e.y;

      console.log([x, y])

      //alert("the chart was clicked");
      for (var i = 0; i < quadrants.length; i++)
      {
        if (inQuadrant(quadrants[i], x, y))
        {
          console.log("quadrant " + quadrants[i].quad);
          // draw chart with new data
          chart.draw(data2, options);
          return;
        }
      }
      alert("unexpected out of range!");
    }

    data1 = google.visualization.arrayToDataTable(data1);
    data2 = google.visualization.arrayToDataTable(data2);
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    google.visualization.events.addListener(chart, 'click', clickHandler);
    chart.draw(data1, options);
  }
}