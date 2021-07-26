//quelques variables pour nous faciliter la vie... Et préparation des arrays pour les données des tableaux
let table1ParentDiv = document.getElementById("table1").parentNode;
let table1 = document.getElementById("table1");
let table2ParentDiv = document.getElementById("table2").parentNode;
let table2 = document.getElementById("table2");
const Canvas1Data = [];
const Canvas2Data = [];
const Canvas1Crimes = [];
const Canvas2Crimes = [];
const Canvas2Crimes79 = [];
const Canvas2Crimes1012 = [];

//on prépare la fonction pour récupérer les données des tableaux et les push en arrays
function table_to_array(table_id, array, x) {
    let myData = document.getElementById(table_id).rows
    //console.log(myData)
    for (var i = x; i < myData.length; i++) {
            el = myData[i].children;
            array[i-x] = [];
            array[i-x].push(el[1].innerText);
            for (var j = x; j < el.length; j++) {
                let crimes = el[j].innerText;
                var rightCrimes = crimes.replace(/,/g, '.');
                value = Number(rightCrimes);
                array[i-x].push(value)
            }
    }
    return array;
}

//on l'applique une fois pour chaque tableau...
table_to_array("table1", Canvas1Data, 2);
table_to_array("table2", Canvas2Data, 1);
console.log(Canvas2Data);

//on crée les éléments dans le html, avec à chaque fois une div contenant le canvas et les éventuels boutons
let newDiv = document.createElement("div");
newDiv.setAttribute("id", "Canvas1Parent");
let newCanv = document.createElement("canvas");
newCanv.setAttribute("id", "Canvas1");
newDiv.appendChild(newCanv);
let newButton1 = document.createElement("button");
newButton1.innerHTML = "Add Country";
newButton1.setAttribute("id", "addDataCanvas1");
newDiv.appendChild(newButton1);
let newButton2 = document.createElement("button");
newButton2.innerHTML = "Remove Country";
newButton2.setAttribute("id", "removeDataCanvas1");
newDiv.appendChild(newButton2);
table1ParentDiv.insertBefore(newDiv, table1);

let newDiv2 = document.createElement("div");
newDiv2.setAttribute("id", "Canvas2Parent");
let newCanv2 = document.createElement("canvas");
newCanv2.setAttribute("id", "Canvas2");
newDiv2.appendChild(newCanv2);
let newButton3 = document.createElement("button");
newButton3.innerHTML = "Add Country";
newButton3.setAttribute("id", "addDataCanvas2");
newDiv2.appendChild(newButton3);
let newButton4 = document.createElement("button");
newButton4.innerHTML = "Remove Country";
newButton4.setAttribute("id", "removeDataCanvas2");
newDiv2.appendChild(newButton4);
table2ParentDiv.insertBefore(newDiv2, table2);

//on recrée un array avec cette fois uniquement les chiffres
for (l=0; l < Canvas1Data.length; l++) {
    Canvas1Crimes[l] = [];
    let arrayElement = Canvas1Data[l];
    for (x=1; x < arrayElement.length; x++) {
        Canvas1Crimes[l].push(arrayElement[x]);
    }
}

for (l=0; l < Canvas2Data.length; l++) {
  Canvas2Crimes[l] = [];
  let arrayElement = Canvas2Data[l];
  for (x=2; x < arrayElement.length; x++) {
      Canvas2Crimes[l].push(arrayElement[x]);
  }
}

for (l=0; l < Canvas2Crimes.length; l++) {
  let arrayElement = Canvas2Crimes[l];
  Canvas2Crimes79.push(arrayElement[0]);
}

for (l=0; l < Canvas2Crimes.length; l++) {
  let arrayElement = Canvas2Crimes[l];
  Canvas2Crimes1012.push(arrayElement[1]);
}

console.log(Canvas2Crimes);
console.log(Canvas2Crimes79);
console.log(Canvas2Crimes1012);

//On pose le contexte pour les graphiques...
var ctx = document.getElementById('Canvas1').getContext('2d');
var ctx2 = document.getElementById('Canvas2').getContext('2d');

//Code du premier graphique. On pose d'abord les variables et les données des années concernées
const DATA_COUNT = 11;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 8000};
const YEARS = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];

const labels = YEARS;
//on pose ensuite la base de données de base pour le premier graphique
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

//on pose la configuration du graphique
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

//Et on applique le tout 
var myChart = new Chart(ctx,config);

//Event listeners des boutons, pour ajouter ou retirer des données de la base de données à afficher
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


const DATA_COUNT2 = 5;
const NUMBER_CFG2 = {count: DATA_COUNT2, min: 0, max: 400};
const COUNTRIES = [];
let countriesCount = 4;
for (let num = 0; num <= countriesCount; num++) {
  let arrayElement = Canvas2Data[num];
  COUNTRIES.push(arrayElement[0]);
}
console.log(COUNTRIES);

const labels2 = COUNTRIES;
const data2 = {
  labels: labels2,
  datasets: [
    {
      label: '2007-09',
      data: Canvas2Crimes79,
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132,0.5)",
    },
    {
      label: '2010-12',
      data: Canvas2Crimes1012,
      borderColor: "rgba(54, 162, 235,1)",
      backgroundColor: "rgba(54, 162, 235,0.5)",
    }
  ]
};

const config2 = {
  type: 'bar',
  data: data2,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  },
};

var myChart2 = new Chart(ctx2,config2);

document.getElementById("addDataCanvas2").addEventListener("click", () => {
  const data3 = myChart2.data;
  if (data3.datasets.length > 0) {
    COUNTRIES.push(Canvas2Data[COUNTRIES.length + 1][0]);
    data3.labels = COUNTRIES;

    data3.datasets[0].data.push(Canvas2Crimes79[COUNTRIES.length +1]);
    data3.datasets[1].data.push(Canvas2Crimes1012[COUNTRIES.length +1]);
   

    myChart2.update();
  }
})

document.getElementById("removeDataCanvas2").addEventListener("click", () => { 
  const data3 = myChart2.data;
  COUNTRIES.pop();
  data3.labels = COUNTRIES;
  

  data3.datasets[0].data.pop();
  data3.datasets[1].data.pop();

  myChart2.update();
})