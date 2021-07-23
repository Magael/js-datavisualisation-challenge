let table1ParentDiv = document.getElementById("table1").parentNode;
let table1 = document.getElementById("table1");
const data = [];

function table_to_array(table_id) {
    let myData = document.getElementById(table_id).rows
    //console.log(myData)
    for (var i = 2; i < myData.length; i++) {
            el = myData[i].children
            for (var j = 2; j < el.length; j++) {
                my_el = {};
                my_el.name = el[1].innerText;
                let crimes = el[j].innerText;
                var rightCrimes = crimes.replace(/,/g, '.');
                my_el.value = Number(rightCrimes);
                my_el.date = 2000+j;
                data.push(my_el)
            }
    }
}

table_to_array("table1");
console.log(data);

let newDiv = document.createElement("div");
let newCanv = document.createElement("canvas");
newCanv.setAttribute("id", "Canvas1");
newDiv.appendChild(newCanv);
table1ParentDiv.insertBefore(newDiv, table1);

var ctx = document.getElementById('Canvas1').getContext('2d');

const config = {
    type: 'line',
    data,
    options: {}
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  var myChart = new Chart(
    ctx,
    config
  );