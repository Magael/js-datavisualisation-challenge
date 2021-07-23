let table1ParentDiv = document.getElementById("table1").parentNode;
let table1 = document.getElementById("table1");
const Canvas1Data = [];

function table_to_array(table_id) {
    let myData = document.getElementById(table_id).rows
    //console.log(myData)
    for (var i = 2; i < myData.length; i++) {
            el = myData[i].children;
            Canvas1Data[i-2] = [];
            Canvas1Data[i-2].push(el[1].innerText);
            for (var j = 2; j < el.length; j++) {
                let crimes = el[j].innerText;
                var rightCrimes = crimes.replace(/,/g, '.');
                value = Number(rightCrimes);
                Canvas1Data[i-2].push(value)
            }
    }
    return Canvas1Data;
}

table_to_array("table1");
console.log(Canvas1Data);

let newDiv = document.createElement("div");
newDiv.setAttribute("id", "Canvas1Parent");
let newCanv = document.createElement("canvas");
newCanv.setAttribute("id", "Canvas1");
newDiv.appendChild(newCanv);
let newButton1 = document.createElement("button");
newButton1.innerHTML = "Add Dataset";
newButton1.setAttribute("id", "addDataCanvas1");
newDiv.appendChild(newButton1);
let newButton2 = document.createElement("button");
newButton2.innerHTML = "Remove Dataset";
newButton2.setAttribute("id", "removeDataCanvas1");
newDiv.appendChild(newButton2);
table1ParentDiv.insertBefore(newDiv, table1);
const Canvas1Crimes = [];

for (l=0; l < Canvas1Data.length; l++) {
    Canvas1Crimes[l] = [];
    let arrayElement = Canvas1Data[l];
    for (x=1; x < arrayElement.length; x++) {
        Canvas1Crimes[l].push(arrayElement[x]);
    }
}

console.log(Canvas1Crimes);

var ctx = document.getElementById('Canvas1').getContext('2d');

const DATA_COUNT = 11;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 8000};
const YEARS = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];

const labels = YEARS;
const data = {
  labels: labels,
  datasets: [
    {
      label: Canvas1Data[0][0],
      data: Canvas1Crimes[0],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132,0.5)",
    },
    {
      label: Canvas1Data[1][0],
      data: Canvas1Crimes[1],
      borderColor: "rgba(54, 162, 235,1)",
      backgroundColor: "rgba(54, 162, 235,0.5)",
    }
  ]
};

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Crimes by countries'
        }
      }
    },
};

var myChart = new Chart(ctx,config);

document.getElementById("addDataCanvas1").addEventListener("click", () => {
    const data2 = myChart.data;
    var colorNumber1 = Math.floor(Math.random()*255);
    var colorNumber2 = Math.floor(Math.random()*255);
    var colorNumber3 = Math.floor(Math.random()*255);
    const newDataset = {
        label: Canvas1Data[data2.datasets.length + 1][0],
        backgroundColor: `rgba(${colorNumber1},${colorNumber2},${colorNumber3}, 0.5)`,
        borderColor: `rgba(${colorNumber1},${colorNumber2},${colorNumber3}, 1)`,
        data: Canvas1Crimes[data2.datasets.length + 1],
    };
    myChart.data.datasets.push(newDataset);
    myChart.update();
})

document.getElementById("removeDataCanvas1").addEventListener("click", () => {
    myChart.data.datasets.pop();
    myChart.update();
})
