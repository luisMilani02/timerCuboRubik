let tempo_anterior
let time
let contando = false
let milisec = 0
let min = 0
let sec = '0' + 0
let interval
let tipo_cubo

let row
let tempoCell 
let cuboCell
let acoesCell
let del
let maisDois

let currentScrollPosition

const deleta = document.getElementById('deleteAll')
let cubo = document.getElementById('cubo')
const tabelaTempos = document.getElementById("table")

const headerRow = document.createElement("tr")
const headerTempo = document.createElement("th")
headerTempo.textContent = "Tempo"
const headerCubo = document.createElement("th")
headerCubo.textContent = "Cubo"
const headerAcoes = document.createElement("th")
headerAcoes.textContent = "Ações"

headerRow.appendChild(headerTempo)
headerRow.appendChild(headerCubo)
headerRow.appendChild(headerAcoes)
tabelaTempos.appendChild(headerRow)

document.body.appendChild(tabelaTempos)

function triggerCustomEvent() {
    const event = new Event('newScrambleEvent')
    document.dispatchEvent(event)
}

function atualizouSelect() {
    let select = document.querySelector('#cubo')
    let optionValue = select.options[select.selectedIndex]
    let text = optionValue.text
    tipo_cubo = text
}

atualizouSelect()

cubo.addEventListener("change", function() {
    atualizouSelect()
    cubo.blur()
})
document.addEventListener('keyup', teclado)
deleta.addEventListener('click', function() {
    deletar()
    deleta.blur()
})

function teclado(e) {
    if (e.keyCode == 32) {
        if (contando == false) {
            contando = true
            interval = setInterval(tempo, 10)
            currentScrollPosition = window.screenY
            window.scrollTo(0, 0)

        } else {
            window.scrollTo(0, 0)
            
            contando = false
            clearInterval(interval)

            currentScrollPosition = window.screenY

            row = document.createElement("tr")
            tempoCell = document.createElement("td")
            cuboCell = document.createElement("td")
            acoesCell = document.createElement("td")

            del = document.createElement("button")
            del.textContent = "X"
            maisDois = document.createElement("button")
            maisDois.textContent = "+2"

            del.onclick = function() {
                tabelaTempos.removeChild(row)
                document.getElementById("tempoMin").textContent = "00"
                document.getElementById("tempoSec").textContent = "00"
                document.getElementById("tempoMilisec").textContent = "00"
            }

            if (min == 0) {
                tempoCell.textContent = sec + ':' + milisec
            } else {
                tempoCell.textContent = min + ':' + sec + ':' + milisec
            }

            maisDois.onclick = function () {
                if (!tempoCell.textContent.includes("+2")) {
                    tempoCell.textContent += " +2"
                } else {
                    tempoCell.textContent = tempoCell.textContent.replace(" +2", "")
                }
            }

            cuboCell.textContent = tipo_cubo
            acoesCell.appendChild(del)
            acoesCell.appendChild(maisDois)

            row.appendChild(tempoCell)
            row.appendChild(cuboCell)
            row.appendChild(acoesCell)

            tabelaTempos.insertBefore(row, tabelaTempos.children[1])

            triggerCustomEvent()

            milisec = 0
            sec = "0" + 0
            min = "0" + 0
        }
    }
}

function tempo() {
    milisec++
    if (milisec <= 9) {
        milisec = "0" + milisec
    }

    if (milisec == 100) {
        sec++
        milisec = 0
        if (sec <= 9) {
            if (sec === 0) {
                sec = "00"
            } else {
                sec = "0" + sec
            }
        }
    } else if (sec == 60) {
        min++
        milisec = 0
        sec = "0" + 0        
        if (min <= 9) {
            min = "0" + min
        }
    }
    if (min == 0) {
        min = "00"
        document.getElementById("tempoMin").textContent = min
        document.getElementById('dpMin').textContent = ":"
        document.getElementById("tempoSec").textContent = sec
        document.getElementById("tempoMilisec").textContent = milisec
        console.log(sec + ":" + milisec)
    } else {
        document.getElementById("tempoMin").textContent = min
        document.getElementById('dpMin').textContent = ":"
        document.getElementById("tempoSec").textContent = sec
        document.getElementById("tempoMilisec").textContent = milisec
        console.log(min + ':' + sec + ":" + milisec)
    }
}

function deletar() {
    let rows = tabelaTempos.getElementsByTagName("tr")

    for (let i = rows.length - 1; i > 0; i--) {
        tabelaTempos.deleteRow(i)
    }
}

document.addEventListener('keypress', Event => {
    Event.key.toLowerCase()
    if (Event.key == '+' || Event.key == "2") {
        if (!tempoCell.textContent.includes("+2")) {
            tempoCell.textContent += " +2"
        } else {
            tempoCell.textContent = tempoCell.textContent.replace(" +2", "")
        }
    } else if (Event.key == "d" || Event.key == "x" || Event.key == "backspace" || Event.key == "delete") {
        tabelaTempos.removeChild(row)
        document.getElementById("tempoMin").textContent = "00"
        document.getElementById("tempoSec").textContent = "00"
        document.getElementById("tempoMilisec").textContent = "00"  
    } else if (Event.key == "r") {
        deletar()
    }
})