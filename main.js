var data = JSON.parse(window.data);
var time;
var s;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }
  return array;
}

(async () => {
  console.log('Filling in missing answers')
  var startTime = Date.now()
  try {
    for (var c = 0; c < data.categories.length; c++) {
      for (var  l = 0; l < 26; l++) {
        //console.log(`Checking ${data.categories[c]} letter ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[l]}`);
        if (data.answers[data.categories[c]]['ABCDEFGHIJKLMNOPQRSTUVWXYZ'[l]].length == 0) {
        	var endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${data.categories[c]} starting with ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[l]}`;
          var response = await fetch(endpoint);
          if (!response.ok) {
            throw Error(response.statusText);
          }
          var json = await response.json();
          var res = [];
          json.query.search.forEach(result => {
            if (result.title[0].toUpperCase() == 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[l]) {
              res.push(result.title.replace(/ *\([^)]*\) */g, "").trim());
            }
          });
          //console.log(res);
          data.answers[data.categories[c]]['ABCDEFGHIJKLMNOPQRSTUVWXYZ'[l]] = res
        }
      }
    }
    console.log('Successfully filled in missing answers');
    console.log('Total time: '+((Date.now()-startTime)/1000)+' seconds');
    console.log(data.answers);
  } catch (e) {
    console.log('An error ocurred when filling in answers'+'\nError details: '+e+'\nSkipping filling in answers')
  }
})();

function clear() {
  var cells = [
    [document.querySelector("#A1"),document.querySelector("#A2"),document.querySelector("#A3"),document.querySelector("#A4"),document.querySelector("#A5")],
    [document.querySelector("#B1"),document.querySelector("#B2"),document.querySelector("#B3"),document.querySelector("#B4"),document.querySelector("#B5")],
    [document.querySelector("#C1"),document.querySelector("#C2"),document.querySelector("#C3"),document.querySelector("#C4"),document.querySelector("#C5")],
    [document.querySelector("#D1"),document.querySelector("#D2"),document.querySelector("#D3"),document.querySelector("#D4"),document.querySelector("#D5")],
    [document.querySelector("#E1"),document.querySelector("#E2"),document.querySelector("#E3"),document.querySelector("#E4"),document.querySelector("#E5")]
  ];
  for (var y=0; y<5; y++) {
    for (var x=0; x<5; x++) {
      cells[y][x].value = "";
      cells[y][x].parentElement.style.backgroundColor = "#fff";
    }
  }
}

var tableAnswers;

function generate() {
  clearInterval(s);
  s = setInterval(second, 1000);
  time = 360
  clear();
  document.querySelector('#timer').style.display = "block";
  document.querySelector('#timer').innerHTML = "Timer: 6:00";
  document.querySelector('#table').style.display = "inline";
  document.querySelector('#check').style.display = "inline";
  document.querySelector('#check').disabled = false;
  for (var c=0; c<25; c++) {
    document.querySelectorAll('input')[c].disabled = false;
  }
  //var categories = ["1","2","3","4","5","6","7","8","9","10"];
  console.log("#0");
  var categories = data["categories"];
  var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  /*var answers = {"1":{"A":["A1"],"B":["B1"],"C":["C1"],"D":["D1"],"E":["E1"],"F":["F1"],"G":["G1"],"H":["H1"],"I":["I1"],"J":["J1"],"K":["K1"],"L":["L1"],"M":["M1"],"N":["N1"],"O":["O1"],"P":["P1"],"Q":["Q1"],"R":["R1"],"S":["S1"],"T":["T1"],"U":["U1"],"V":["V1"],"W":["W1"],"X":["X1"],"Y":["Y1"],"Z":["Z1"]},
                "2":{"A":["A2"],"B":["B2"],"C":["C2"],"D":["D2"],"E":["E2"],"F":["F2"],"G":["G2"],"H":["H2"],"I":["I2"],"J":["J2"],"K":["K2"],"L":["L2"],"M":["M2"],"N":["N2"],"O":["O2"],"P":["P2"],"Q":["Q2"],"R":["R2"],"S":["S2"],"T":["T2"],"U":["U2"],"V":["V2"],"W":["W2"],"X":["X2"],"Y":["Y2"],"Z":["Z2"]},
                "3":{"A":["A3"],"B":["B3"],"C":["C3"],"D":["D3"],"E":["E3"],"F":["F3"],"G":["G3"],"H":["H3"],"I":["I3"],"J":["J3"],"K":["K3"],"L":["L3"],"M":["M3"],"N":["N3"],"O":["O3"],"P":["P3"],"Q":["Q3"],"R":["R3"],"S":["S3"],"T":["T3"],"U":["U3"],"V":["V3"],"W":["W3"],"X":["X3"],"Y":["Y3"],"Z":["Z3"]},
                "4":{"A":["A4"],"B":["B4"],"C":["C4"],"D":["D4"],"E":["E4"],"F":["F4"],"G":["G4"],"H":["H4"],"I":["I4"],"J":["J4"],"K":["K4"],"L":["L4"],"M":["M4"],"N":["N4"],"O":["O4"],"P":["P4"],"Q":["Q4"],"R":["R4"],"S":["S4"],"T":["T4"],"U":["U4"],"V":["V4"],"W":["W4"],"X":["X4"],"Y":["Y4"],"Z":["Z4"]},
                "5":{"A":["A5"],"B":["B5"],"C":["C5"],"D":["D5"],"E":["E5"],"F":["F5"],"G":["G5"],"H":["H5"],"I":["I5"],"J":["J5"],"K":["K5"],"L":["L5"],"M":["M5"],"N":["N5"],"O":["O5"],"P":["P5"],"Q":["Q5"],"R":["R5"],"S":["S5"],"T":["T5"],"U":["U5"],"V":["V5"],"W":["W5"],"X":["X5"],"Y":["Y5"],"Z":["Z5"]},
                "6":{"A":["A6"],"B":["B6"],"C":["C6"],"D":["D6"],"E":["E6"],"F":["F6"],"G":["G6"],"H":["H6"],"I":["I6"],"J":["J6"],"K":["K6"],"L":["L6"],"M":["M6"],"N":["N6"],"O":["O6"],"P":["P6"],"Q":["Q6"],"R":["R6"],"S":["S6"],"T":["T6"],"U":["U6"],"V":["V6"],"W":["W6"],"X":["X6"],"Y":["Y6"],"Z":["Z6"]},
                "7":{"A":["A7"],"B":["B7"],"C":["C7"],"D":["D7"],"E":["E7"],"F":["F7"],"G":["G7"],"H":["H7"],"I":["I7"],"J":["J7"],"K":["K7"],"L":["L7"],"M":["M7"],"N":["N7"],"O":["O7"],"P":["P7"],"Q":["Q7"],"R":["R7"],"S":["S7"],"T":["T7"],"U":["U7"],"V":["V7"],"W":["W7"],"X":["X7"],"Y":["Y7"],"Z":["Z7"]},
                "8":{"A":["A8"],"B":["B8"],"C":["C8"],"D":["D8"],"E":["E8"],"F":["F8"],"G":["G8"],"H":["H8"],"I":["I8"],"J":["J8"],"K":["K8"],"L":["L8"],"M":["M8"],"N":["N8"],"O":["O8"],"P":["P8"],"Q":["Q8"],"R":["R8"],"S":["S8"],"T":["T8"],"U":["U8"],"V":["V8"],"W":["W8"],"X":["X8"],"Y":["Y8"],"Z":["Z8"]},
                "9":{"A":["A9"],"B":["B9"],"C":["C9"],"D":["D9"],"E":["E9"],"F":["F9"],"G":["G9"],"H":["H9"],"I":["I9"],"J":["J9"],"K":["K9"],"L":["L9"],"M":["M9"],"N":["N9"],"O":["O9"],"P":["P9"],"Q":["Q9"],"R":["R9"],"S":["S9"],"T":["T9"],"U":["U9"],"V":["V9"],"W":["W9"],"X":["X9"],"Y":["Y9"],"Z":["Z9"]},
                "10":{"A":["A10"],"B":["B10"],"C":["C10"],"D":["D10"],"E":["E10"],"F":["F10"],"G":["G10"],"H":["H10"],"I":["I10"],"J":["J10"],"K":["K10"],"L":["L10"],"M":["M10"],"N":["N10"],"O":["O10"],"P":["P10"],"Q":["Q10"],"R":["R10"],"S":["S10"],"T":["T10"],"U":["U10"],"V":["V10"],"W":["W10"],"X":["X10"],"Y":["Y10"],"Z":["Z10"]}}*/
  var answers = data["answers"];
  console.log("#1");
  shuffle(categories);
  shuffle(letters);
  var h1 = document.querySelector('#h1');
  var h2 = document.querySelector('#h2');
  var h3 = document.querySelector('#h3');
  var h4 = document.querySelector('#h4');
  var h5 = document.querySelector('#h5');
  var A = document.querySelector('#A');
  var B = document.querySelector('#B');
  var C = document.querySelector('#C');
  var D = document.querySelector('#D');
  var E = document.querySelector('#E');
  var left = [A,B,C,D,E];
  var top = [h1,h2,h3,h4,h5];
  for (var i = 0; i<5; i++) {
    left[i].innerHTML = letters[i];
  }
  console.log("#2");
  for (var i = 0; i<5; i++) {
    top[i].innerHTML = categories[i];
  }
  tableAnswers = [
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]],
    [[],[],[],[],[]]
  ];
  try {
    for (var y=0; y<5; y++) {
      for (var x=0; x<5; x++) {
        tableAnswers[y][x] = answers[categories[x]][letters[y]];
      }
    }
  }
  catch(e) {}
}

function check() {
  clearInterval(s);
  var cells = [
    [document.querySelector("#A1"),document.querySelector("#A2"),document.querySelector("#A3"),document.querySelector("#A4"),document.querySelector("#A5")],
    [document.querySelector("#B1"),document.querySelector("#B2"),document.querySelector("#B3"),document.querySelector("#B4"),document.querySelector("#B5")],
    [document.querySelector("#C1"),document.querySelector("#C2"),document.querySelector("#C3"),document.querySelector("#C4"),document.querySelector("#C5")],
    [document.querySelector("#D1"),document.querySelector("#D2"),document.querySelector("#D3"),document.querySelector("#D4"),document.querySelector("#D5")],
    [document.querySelector("#E1"),document.querySelector("#E2"),document.querySelector("#E3"),document.querySelector("#E4"),document.querySelector("#E5")]
  ];
  for (var y=0; y<5; y++) {
    for (var x=0; x<5; x++) {
      var cellAnswers = tableAnswers[y][x];
      cellAnswers = cellAnswers.map(x => x.toLowerCase());
      if (cellAnswers.includes(cells[y][x].value.toLowerCase())) {
        cells[y][x].value += " ✓";
        cells[y][x].parentElement.style.backgroundColor = "#bfb";
      } else {
        cells[y][x].value += " ✗";
        cells[y][x].parentElement.style.backgroundColor = "#fbb";
      }
    }
  }
  document.querySelector('#check').disabled = true;
  for (var c=0; c<25; c++) {
    document.querySelectorAll('input')[c].disabled = true;
  }
}

function second() {
  time--;
  document.querySelector('#timer').innerHTML = `Timer: ${Math.floor(time/60)}:${('0'+time%60).substr(-2, 2)}`;
  if (time <= 0) {
    document.querySelector('#timer').innerHTML = "Time's up!";
    check();
  }
}
