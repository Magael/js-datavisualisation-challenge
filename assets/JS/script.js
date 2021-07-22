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

duration = 250
n = 12
names = new Set(data.map(d => d.name))
datevalues = Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
  .map(([date, data]) => [date, data])
  .sort(([a], [b]) => d3.ascending(a, b))
console.log(datevalues);

function rank(value) {
    const data = Array.from(names, name => ({name, value: value(name)}));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
}

var ranksTest = rank(name => datevalues[0][1].get(name));
console.log(ranksTest);

let newDiv = document.createElement("div");
table1ParentDiv.insertBefore(newDiv, table1);