let chartDiv=document.createElement("div");
let chartParentDiv = document.getElementById("bodyContent").parentNode;
chartParentDiv.insertBefore(chartDiv, bodyContent);
let svg = dimple.newSvg("firstHeading", 800, 600);
window.onload = function() {
	let dataPoints = [];
	let chart;
	fetch("https://canvasjs.com/services/data/datapoints.php")
	.then(response=>response.json())	
    .then(data=>{
        data.forEach(item=>{
			dataPoints.push({x: item[0], y: parseInt(item[1])});
		});
        var chart = new dimple.chart(svg, data);
        chart.addCategoryAxis("x");
        chart.addMeasureAxis("y");
        chart.addSeries(null, dimple.plot.bar);
        chart.draw();
		chart.render();
		//updateChart();
	});
	/*function updateChart() {
	fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json")
    .then (response=>response.json())
	.then(data=>
        	data.each(item=> {
			dataPoints.push({
			x: parseInt(item[0]),
			y: parseInt(item[1])
			});
		}));
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	};*/
	
}