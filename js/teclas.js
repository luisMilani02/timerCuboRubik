var tempo_anterior;
var time;
var contando = false;
var milisec = 0;
var min = 0;
var sec = '0' + 0;
var interval;
var tipo_cubo;
var tabelaTempos = document.createElement("table");

// Cabeçalho da tabela
var headerRow = document.createElement("tr");
var headerTempo = document.createElement("th");
headerTempo.textContent = "Tempo";
var headerCubo = document.createElement("th");
headerCubo.textContent = "Cubo";
var headerAcoes = document.createElement("th");
headerAcoes.textContent = "Ações";

headerRow.appendChild(headerTempo);
headerRow.appendChild(headerCubo);
headerRow.appendChild(headerAcoes);
tabelaTempos.appendChild(headerRow);

document.body.appendChild(tabelaTempos);

function triggerCustomEvent() {
    const event = new Event('newScrambleEvent');
    document.dispatchEvent(event);
}

function atualizouSelect() {
    let select = document.querySelector('#cubo');
    let optionValue = select.options[select.selectedIndex];
    let text = optionValue.text;
    tipo_cubo = text;
    
}

atualizouSelect();

document.getElementById("cubo").addEventListener("change", atualizouSelect);
document.addEventListener('keyup', teclado)

function teclado(e) {
    if (e.keyCode == 32) {
        if (contando == false) {
            contando = true;
            interval = setInterval(tempo, -10);
        } else {
            contando = false;
            clearInterval(interval);

            var row = document.createElement("tr");
            var tempoCell = document.createElement("td");
            var cuboCell = document.createElement("td");
            var acoesCell = document.createElement("td");

            var del = document.createElement("button");
            del.textContent = "X";
            var maisDois = document.createElement("button");
            maisDois.textContent = "+2";

            del.onclick = function() {
                tabelaTempos.removeChild(row);
                document.getElementById("tempo").innerHTML = "00" + ":" + "00";
            };

            if (min == 0) {
                tempoCell.textContent = sec + ':' + milisec;
            } else {
                tempoCell.textContent = min + ':' + sec + ':' + milisec;
            }

            maisDois.onclick = function () {
                if (!tempoCell.textContent.includes("+2")) {
                    tempoCell.textContent += " +2"
                }
            }

            cuboCell.textContent = tipo_cubo;
            acoesCell.appendChild(del);
            acoesCell.appendChild(maisDois);

            row.appendChild(tempoCell);
            row.appendChild(cuboCell);
            row.appendChild(acoesCell);

            tabelaTempos.insertBefore(row, tabelaTempos.children[1]);

            triggerCustomEvent();

            milisec = 0;
            sec = "0" + 0;
            min = "0" + 0;
        }
    }
}

function tempo() {
    milisec++;
    if (milisec <= 9) {
        milisec = "0" + milisec
    }
    if (milisec == 100) {
        sec++;
        milisec = 0;
        if (sec <= 9) {
            sec = "0" + sec
        }
    } else if (sec == 60) {
        min++;
        milisec = 0;
        sec = 0;        
        if (min <= 9) {
            min = "0" + min
        }
    }
    if (min == 0) {
        document.getElementById("tempo").innerHTML = sec + ":" + milisec;
        console.log(sec + ":" + milisec);
    } else {
        document.getElementById("tempo").innerHTML = min + ':' + sec + ":" + milisec;
        console.log(min + ':' + sec + ":" + milisec);
    }
}