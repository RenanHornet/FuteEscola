//Seleciona o formato do torneio
function selecionarFormato(qtdTimes) {
    if (qtdTimes === 4) {
        window.location.href = "times4.html";
    } else {
        window.location.href = "times6.html";
    }
}