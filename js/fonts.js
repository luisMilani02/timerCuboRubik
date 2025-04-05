setInterval(() => {verificaFont()}, 1000);

function verificaFont() {
    let scrambleText = document.getElementById("scramble").innerHTML;
    let comprimento = scrambleText.length;
    let screenSz = document.body.clientWidth
    let fontSize;

    if (screenSz >= 600) {
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
    } else {
        if (comprimento <= 60) {
            fontSize = "1.2em";  
        } else if (comprimento <= 140) {
            fontSize = "1em";
        } else if (comprimento <= 190) {
            fontSize = ".8em";
        } else if (comprimento <= 305) {
            fontSize = ".7em"
        } else {
            fontSize = ".6em"
        }
    }

    document.getElementById("scramble").style.fontSize = fontSize;
}