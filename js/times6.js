let listaDeTimes = [];
let contador = 1;
/*adiciona times com 1 forms somente*/ 
function adicionarTime() {
    const nomeTime = document.getElementById("nome-time").value.trim();
    const inputsJogadores = document.querySelectorAll(".jog-input");
    let jogadores = [];

    // Validação simples
    if (nomeTime === "") {
        alert("Por favor, digite o nome do time.");
        return;
    }

    // Coleta jogadores preenchidos
    inputsJogadores.forEach(input => {
        if (input.value.trim() !== "") {
            jogadores.push(input.value.trim());
        }
    });

    // Adiciona ao array principal
    listaDeTimes.push({
        time: nomeTime,
        jogadores: jogadores
    });

    // Verifica se já chegou no limite
    if (contador < 6) {
        contador++;
        // Limpa o formulário para o próximo
        document.getElementById("formTimes6").reset();
        // Atualiza os textos na tela
        document.getElementById("num-time").innerText = contador;
        document.getElementById("titulo-time").innerText = "Time " + contador;
    } 
    
    // Se cadastrou o 6º time, troca os botões
    if (contador === 6) {
        document.getElementById("btn-proximo").style.display = "none";
        document.getElementById("btn-finalizar").style.display = "block";
    }
}
/*gera jogos do torneio*/ 
function finalizarCadastro() {
    
    
    // 1. (Embaralhar)
    listaDeTimes.sort(() => Math.random() - 0.5);

    // 2. Dividir Grupos (Slicing)
    const grupoA = listaDeTimes.slice(0, 3);
    const grupoB = listaDeTimes.slice(3, 6);

    // 3. Estruturar os dados para o localStorage
    const dadosTorneio = {
        formato: "grupos",
        grupoA: grupoA,
        grupoB: grupoB,
       
        partidas: gerarConfrontosIniciais(grupoA, grupoB)
    };

    localStorage.setItem("torneioAtual", JSON.stringify(dadosTorneio));
    alert("Grupos gerados com sucesso!");
    window.location.href = "chaveamento_grupos.html";
}
/*gera os confrontos por grupo*/ 
function gerarConfrontosIniciais(ga, gb) {
    return {
        "A": [
            { t1: ga[0].time, t2: ga[1].time, gols1: 0, gols2: 0, status: 'p' },
            { t1: ga[1].time, t2: ga[2].time, gols1: 0, gols2: 0, status: 'p' },
            { t1: ga[2].time, t2: ga[0].time, gols1: 0, gols2: 0, status: 'p' }
        ],
        "B": [
            { t1: gb[0].time, t2: gb[1].time, gols1: 0, gols2: 0, status: 'p' },
            { t1: gb[1].time, t2: gb[2].time, gols1: 0, gols2: 0, status: 'p' },
            { t1: gb[2].time, t2: gb[0].time, gols1: 0, gols2: 0, status: 'p' }
        ]
    };
}