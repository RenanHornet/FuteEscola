//Seleciona o formato do torneio
function selecionarFormato(qtdTimes) {
    if (qtdTimes === 4) {
        window.location.href = "../php/times4.php";
    } else {
        window.location.href = "../php/times6.php";
    }
}