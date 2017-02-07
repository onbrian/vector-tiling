function addColumnNames(data)
{
  data.unshift(['x', 'y']);
  return;
}

var testData1 = [
  [1,  12],
  [5,  34],
  [8,  14],
  [11, 19],
  [13, 38],
  [24, 7],
  [33, 28],
  [38, 36]
];

var testData2 = [
  [12, 1],
  [35, 5],
  [29, 12],
  [38, 28],
  [20, 33]
]

var testData3 = [
  [1, 1],
  [35, 5],
  [6, 12],
  [33,23],
  [15, 29],
]

var testData = testData3;

var clippedData = clipLineX(testData, 10, 30);
addColumnNames(testData);
addColumnNames(clippedData);
console.log(clippedData)

// when google visualization API is loaded, call callback to draw chart
google.charts.setOnLoadCallback(drawChart(testData, clippedData));

//console.log(Geometry.intersectY([0, 0], [10, 20], 3.333))

var quadrant = new Quadrant(0, 0, 40, 0, 40);
console.log(quadrant.getSubQuadrants());

//var tileTest = new Tile(quadrant, testData2);

//tileTest.subtile()

