
/*limpa os dados do torneio anterior no navegador*/ 
function iniciarNovoTorneio() {
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("torneioAtual"); // limpa o de 6 times
    localStorage.removeItem("times4");       // ADICIONE ESTA LINHA: limpa o de 4 times anterior
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formTimes4");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        salvarTimes4();
    });
});
/*função que salva os times*/ 
function salvarTimes4(){
    iniciarNovoTorneio(); // Limpa os dados anteriores
    const times = [];

    // 1. Captura o nome do campeonato do novo campo HTML
    const nomeCampInput = document.getElementById("nome-campeonato");
    const nomeCampeonato = nomeCampInput ? nomeCampInput.value.trim() : "";

    // 2. Coleta os dados de cada time nos cards
    document.querySelectorAll("fieldset.card-time").forEach((card) => {
    const inputNomeTime = card.querySelector(".nomes-times");

    // IMPORTANTE: Só entra aqui se houver um input de nome de time (evita pegar o card do título)
    if (inputNomeTime) {
        const nomeTime = inputNomeTime.value.trim();
        
        // Pega apenas os inputs que estão DEPOIS do nome do time (jogadores)
        const inputsJogadores = card.querySelectorAll("input:not(.nomes-times)");
        const jogadores = [];

        inputsJogadores.forEach(input => {
            if (input.value.trim() !== "" && input.id !== "nome-campeonato") {
                jogadores.push(input.value.trim());
            }
        });

        if (nomeTime !== "") {
            times.push({
                time: nomeTime,
                jogadores: jogadores
            });
        }
    }
});

    // 3. Validação: Nome do torneio e quantidade de times
    if (nomeCampeonato === "" || times.length < 4) {
        alert("Por favor, dê um nome ao torneio e cadastre os 4 times!");
        return;
    }

    // 4. EMBARALHAR (Shuffle)
    // O sorteio é feito aqui para que a ordem aleatória seja salva no banco
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [times[i], times[j]] = [times[j], times[i]];
    }

    // 5. Estrutura o objeto final com o nome e os times sorteados
    const dadosMataMata = {
        nome: nomeCampeonato,
        times: times
    };

    // 6. Salva no navegador (localStorage)
    localStorage.setItem("times4", JSON.stringify(dadosMataMata));

    // 7. Chama a função do save4.js e aguarda a conclusão
    salvarCampeonato4().then((data) => {
        if (data && data.status === "sucesso") {
            if (data.id_save) {
                window.location.href = `chaveamento.php?id=${data.id_save}`
            } else {
                window.location.href = "meus_campeonatos.php";    
            }
            
        }
    });
}
