/* limpa os dados do torneio anterior */
function iniciarNovoTorneio() {
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("torneioAtual");
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formTimes4");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        salvarTimes4();
    });
});

/* função principal */
function salvarTimes4() {

    iniciarNovoTorneio();

    const form = document.getElementById("formTimes4");
    const formData = new FormData(form);

    const times = [];

    /* monta os times (igual você já fazia) */
    document.querySelectorAll(".card-time").forEach((card) => {

        const inputs = card.querySelectorAll("input");

        const nomeTime = inputs[0].value.trim();
        const jogadores = [];

        for (let i = 1; i < inputs.length; i++) {
            if (inputs[i].value.trim() !== "") {
                jogadores.push(inputs[i].value.trim());
            }
        }

        if (nomeTime !== "") {
            times.push({
                time: nomeTime,
                jogadores: jogadores
            });
        }

    });

    /* validação */
    if (times.length < 4) {
        alert("Cadastre os 4 times para gerar o chaveamento!");
        return;
    }

    /* embaralhar */
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [times[i], times[j]] = [times[j], times[i]];
    }

    /* salva no navegador */
    localStorage.setItem("times4", JSON.stringify(times));

    /* 🔥 NOVO: SALVAR NO BANCO */
    fetch("php/salvar_times4.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        
        if (data.status === "sucesso") {

            /* só redireciona se salvou no banco */
            window.location.href = "chaveamento.php";

        } else {
            alert(data.mensagem);
        }

    })
    .catch(() => {
        alert("Erro ao salvar no servidor");
    });

}