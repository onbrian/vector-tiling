// sort points by their "areas"
function pointComparator(p1, p2)
{
  return p1[2] - p2[2];
}

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

//console.log(line1);
//var ranked = Simplify.VisvalWhyattRank(line1);
//console.log(ranked)

var lines = [line1, line2]
//var lines = [[[1, 0], [0, 1], [1, 2], [2, 1], [1, 0]]]
var vt = new VectorTiler(lines);

console.log(vt);


function getZoomTitle(level)
{
  return "Zoom (" + level + ")";
}

// current tile being rendered
var currentTile = vt.baseTile;
window.onload = function () 
{
  var chart = CanvasHelper.tileToChart("chart_container", 410, vt.baseTile);

  // attach handler to reset button
  $("#reset_button").on("click", function()
  {
    CanvasHelper.renderTile(chart, vt.baseTile);
    currentTile = vt.baseTile;

    // update title
    $("#zoom_grid_title").html(getZoomTitle(currentTile.zoomLevel));
  });

  // attach handle to zoom out button
  $("#zoomout_button").on("click", function()
  {
    if (currentTile.zoomLevel == 0)
    {
      alert("already at base level!");
      return;
    }

    // fetch parent tile and render
    var parentLabel = new TileLabel(currentTile.label.getParentSeq());
    var parentTile = vt.getTile(parentLabel);
    CanvasHelper.renderTile(chart, parentTile);
    currentTile = parentTile;

    // update title
    $("#zoom_grid_title").html(getZoomTitle(currentTile.zoomLevel));
  });

  // attach handlers to zoom buttons
  var quadrantButtonIDs = ["#zoom_q1", "#zoom_q2", "#zoom_q3", "#zoom_q4"];
  for (var i = 0; i < quadrantButtonIDs.length; i++)
  {
    (function(i)
    {
      $(quadrantButtonIDs[i]).on("click", function()
      {
        // fetch child tile and render
        var childLabel = new TileLabel(currentTile.label.getChildSeq(i + 1));
        var childTile = vt.getTile(childLabel);
        CanvasHelper.renderTile(chart, childTile);
        currentTile = childTile;

        // update title
        $("#zoom_grid_title").html(getZoomTitle(currentTile.zoomLevel));
      })
    })(i);
  }
  chart.render();
}