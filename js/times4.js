document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formTimes4");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        salvarTimes4();
    });
});
/*função que salva os times*/ 
function salvarTimes4(){
    const times = [];

    document.querySelectorAll(".card-time").forEach((card) => {
        const inputs = card.querySelectorAll("input");

        const nomeTime = inputs[0].value.trim();
        const jogadores = [];

        for(let i = 1; i < inputs.length; i++){
            if(inputs[i].value.trim() !== ""){
                jogadores.push(inputs[i].value.trim());
            }
        }

        if(nomeTime !== ""){
            times.push({
                time: nomeTime,
                jogadores: jogadores
            });
        }
    });

    /*validação*/
    if(times.length < 4){
        alert("Cadastre os 4 times para gerar o chaveamento!");
        return;
    }

    /*embaralhar (shuffle)*/
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [times[i], times[j]] = [times[j], times[i]];
    }

    /*salva no navegador*/
    localStorage.setItem("times4", JSON.stringify(times));

    /*redireciona*/
    window.location.href = "chaveamento.html";
}