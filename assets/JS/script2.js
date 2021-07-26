let chartDiv=document.createElement("div");
chartDiv.setAttribute("id","chart");
let Canvas = document.createElement("canvas");
chartDiv.setAttribute('width', '500px');
chartDiv.setAttribute('height', '500px');
Canvas.setAttribute("id", "CanvasChart");
chartDiv.appendChild(Canvas);
let chartParentDiv = document.getElementById("bodyContent").parentNode;
chartParentDiv.insertBefore(chartDiv, bodyContent);
let ctx1 = document.getElementById("CanvasChart").getContext("2d");
let labels1=[];
let dataPoints1=[];

	fetch("https://canvasjs.com/services/data/datapoints.php")
	.then(response=>response.json())	
    .then(data=>{
        data.forEach(item=>{
			labels1.push(item[0]);
			dataPoints1.push(item[1]);
			//console.log();
		});
		console.log(dataPoints1);
	});
	
	
	/*function updateChart() {
		fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (labels1.length + 1) + "&ystart=" + ([dataPoints.length - 1].y) + "&length=1&type=json")
		.then (response=>response.json())
		.then(data=>
				data.forEach(item=> {
					labels1.push(item[0])
					dataPoints.push(item[1]),
				});
			}));
			
			setTimeout(function(){updateChart()}, 1000);
		};*/
		
		const data1= {
		labels: labels1,
		datasets: [
			{
			label: 'Dataset 1',
			data: dataPoints1,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
			}]
		  };
			  
const config1 = {
	type: 'line',
	data: data1,
  };
var myChart1 = new Chart(ctx1,config1);
  

  
