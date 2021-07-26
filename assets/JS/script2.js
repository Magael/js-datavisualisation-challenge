let chartDiv=document.createElement("div");
let chartParentDiv = document.getElementById("bodyContent").parentNode;
chartParentDiv.insertBefore(chartDiv, bodyContent);
//let svg = dimple.newSvg(chartDiv, 590, 400);

window.onload = function() {
	let dataPoints = [];
	fetch("https://canvasjs.com/services/data/datapoints.php")
	.then(response=>response.json())	
    .then(data=>{
        data.forEach(item=>{
			dataPoints.push({x: item[0], y: parseInt(item[1])});
            let chart = new dimple.chart(svg,dataPoints);
            chart.setBounds(80, 30, 480, 330)
            chart.addMeasureAxis("x");
            chart.addCategoryAxis("y");
            chart.addSeries(" ", dimple.plot.bar);
            //chart.addLegend(60, 10, 510, 20, "right");
            console.log(chart);
            chart.draw();
		});
        
        
        console.log(chart);
		//chart.render();
		updateChart();
	});
	function updateChart() {
	fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json")
    .then (response=>response.json())
	.then(data=>
        	data.forEach(item=> {
			dataPoints.push({
			x: parseInt(item[0]),
			y: parseInt(item[1])
			});
		}));
		//chart.render();
		setTimeout(function(){updateChart()}, 1000);
	};
	
}