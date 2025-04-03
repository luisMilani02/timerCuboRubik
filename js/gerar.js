let tipo_cubo;

function atualizouSelect() {
    let select = document.getElementById('cubo')
    let optionValue = select.options[select.selectedIndex]

    let value = optionValue.value 
    let text = optionValue.text

    console.log(value, text)
    tipo_cubo = value
}

atualizouSelect()

import { randomScrambleForEvent } from "https://cdn.cubing.net/v0/js/cubing/scramble";

async function gerar() {
    const scramble = await randomScrambleForEvent(tipo_cubo); 
    console.log(scramble.toString());
    document.getElementById("scramble").innerHTML = scramble.toString();
    verificaFont()
}

document.getElementById("gerador").addEventListener("click", gerar);
document.getElementById("cubo").addEventListener("change", atualizouSelect)
document.getElementById("cubo").addEventListener("change", gerar)
document.getElementById("cubo").addEventListener("change", verificaFont)

setTimeout(() => {
    gerar()
}, 1);

document.addEventListener('newScrambleEvent', gerar);

document.addEventListener('keydown', Event => {
    Event.key.toLowerCase()
    if (Event.key == 'e' || Event.key == 's') {
        gerar()
    }
})

function verificaFont() {
    let scrambleText = document.getElementById("scramble").innerHTML;
    let comprimento = scrambleText.length;

    let fontSize;

    if (comprimento <= 60) {
        fontSize = "1.8em";  
    } else if (comprimento <= 140) {
        fontSize = "1.2em";
    } else if (comprimento <= 190) {
        fontSize = "1em";
    } else if (comprimento <= 305) {
        fontSize = "1em"
    } else {
        fontSize = ".8em"
    }

    document.getElementById("scramble").style.fontSize = fontSize;

}