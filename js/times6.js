
/*limpa os dados do torneio anterior no navegador*/ 
function limparDadosAntigos() {
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("times4");
}



let listaDeTimes = [];
let contador = 1;

function adicionarTime() {
    
    const nomeTime = document.getElementById("nome-time").value.trim();
    const inputsJogadores = document.querySelectorAll(".jog-input");
    let jogadores = [];

    if (nomeTime === "") {
        alert("Por favor, digite o nome do time.");
        return;
    }

    inputsJogadores.forEach(input => {
        if (input.value.trim() !== "") {
            jogadores.push(input.value.trim());
        }
    });

    listaDeTimes.push({
        time: nomeTime,
        jogadores: jogadores
    });

    console.log("Time adicionado:", nomeTime, "Total agora:", listaDeTimes.length);

    // Se ainda não chegamos no 6º, prepara o próximo
    if (contador < 6) {
        contador++;
        document.getElementById("formTimes6").reset();
        document.getElementById("num-time").innerText = contador;
        document.getElementById("titulo-time").innerText = "Time " + contador;
        
        // Se ACABOU de adicionar o 5º, o próximo será o 6º. 
        // Vamos mostrar o botão de finalizar JUNTOS para o 6º time.
        if (contador === 6) {
            document.getElementById("btn-proximo").style.display = "none";
            document.getElementById("btn-finalizar").style.display = "block";
        }
    } 
}

/* Função de finalizar alterada para capturar o último time automaticamente */
function finalizarCadastro() {
    // Se o usuário clicar em finalizar e o 6º time ainda estiver no input, adiciona ele primeiro
    if (listaDeTimes.length === 5) {
        adicionarTime();
    }

    // Agora verifica se realmente temos os 6
    if (listaDeTimes.length < 6) {
        alert("Erro: Você precisa preencher os dados do 6º time antes de finalizar!");
        return;
    }

    limparDadosAntigos(); // Limpa os dados antigos antes de salvar o novo torneio    

    // 1. Embaralhar
    listaDeTimes.sort(() => Math.random() - 0.5);

    // 2. Dividir Grupos
    const grupoA = listaDeTimes.slice(0, 3);
    const grupoB = listaDeTimes.slice(3, 6);

    // 3. Estruturar os dados
    const dadosTorneio = {
        formato: "grupos",
        grupoA: grupoA,
        grupoB: grupoB,
        partidas: gerarConfrontosIniciais(grupoA, grupoB)
    };

    localStorage.setItem("torneioAtual", JSON.stringify(dadosTorneio));
    alert("Campeonato Gerado! Redirecionando...");
    window.location.href = "chaveamento6.html";
}

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