var line1 = [
  [1,  12],
  [5,  34],
  [8,  14],
  [11, 19],
  [13, 38],
  [15, 39],
  [19, 34],
  [20, 3],
  [24, 7],
  [26, 2],
  [29, 3],
  [30, 2],
  [31.5, 8],
  [33, 28],
  [38, 36]
];

var line2 = [
  [4, 36],
  [5, 39],
  [11, 37],
  [12, 24],
  [13, 18],
  [15, 14],
  [18, 10],
  [22, 14],
  [28, 21],
  [29, 25],
  [30, 29],
  [31, 30],
  [33, 26],
  [38, 10],
  [39, 2]
];

//console.log(Geometry.getMinCoordVal(Geometry.X_AXIS, [line1, [[100, 10]]]));


var lines = [line1, line2]
// initialize base quadrant
var quadrant = new Quadrant(0, 0, 40, 0, 40);
// initialize base tile with quadrant and a line
var baseTile = new Tile(quadrant, lines);

var subtiles = baseTile.subtile();
console.log(lines);
var canvasBaseData = Transform.linesToCanvasObjects(baseTile.lines);
window.onload = function () 
{

  // initialize canvas chart
  var chart = CanvasHelper.initializeSqChart("chart_container", 400, 
                                             0, 40, 20,
                                             0, 40, 20, null);

    // set data
  chart.options.data = canvasBaseData;

  // attach handler to reset button
  $("#reset_button").on("click", function()
  {
    CanvasHelper.renderTile(chart, baseTile);
    subtiles = baseTile.subtile();
  });

  // attach handlers to zoom buttons
  var quadrantButtonIDs = ["#zoom_q1", "#zoom_q2", "#zoom_q3", "#zoom_q4"];
  for (var i = 0; i < quadrantButtonIDs.length; i++)
  {
    (function(i)
    {
      $(quadrantButtonIDs[i]).on("click", function()
      {
        CanvasHelper.renderTile(chart, subtiles[i]);
        subtiles = subtiles[i].subtile(); 
      })
    })(i);
  }

  chart.render();
}