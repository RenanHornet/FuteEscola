
function limparDadosAntigos() {
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("times4");
    localStorage.removeItem("torneioAtual"); // Chave principal do torneio de 6
    localStorage.removeItem("semifinal6_dados"); // Chave das semis de 6
}


let listaDeTimes = [];
let contador = 1;
/*cadastra os times no times6*/ 
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

    if (contador < 6) {
        contador++;
        document.getElementById("formTimes6").reset();
        document.getElementById("num-time").innerText = contador;
        document.getElementById("titulo-time").innerText = "Time " + contador;
        
        if (contador === 6) {
            document.getElementById("btn-proximo").style.display = "none";
            document.getElementById("btn-finalizar").style.display = "block";
        }
    } 
}

/* Função de finalizar alterada para capturar o último time automaticamente */
function finalizarCadastro() {
    if (listaDeTimes.length === 5) {
        adicionarTime();
    }

    if (listaDeTimes.length < 6) {
        alert("Erro: Você precisa cadastrar os 6 times antes de gerar o campeonato!");
        return;
    }

    const nomeCampInput = document.getElementById("nome-campeonato");
    const nomeCampeonato = nomeCampInput ? nomeCampInput.value.trim() : "";

    if (nomeCampeonato === "") {
        alert("Por favor, dê um nome ao campeonato!");
        nomeCampInput.focus();
        return;
    }

    limparDadosAntigos(); 

    listaDeTimes.sort(() => Math.random() - 0.5);
    const grupoA = listaDeTimes.slice(0, 3);
    const grupoB = listaDeTimes.slice(3, 6);

    const dadosTorneio = {
        nome: nomeCampeonato,
        formato: "grupos", // Isso ajuda a identificar no JSON
        grupoA: grupoA,
        grupoB: grupoB,
        partidas: gerarConfrontosIniciais(grupoA, grupoB)
    };

    // 1. Salva no localStorage com a chave de 6 times
    localStorage.setItem("torneioAtual", JSON.stringify(dadosTorneio));

    // 2. ENVIO PARA O BANCO
    salvarCampeonato6().then((resposta) => {
        if (resposta && resposta.status === "sucesso") {
            alert("Campeonato '" + nomeCampeonato + "' criado com sucesso!");
            
            // MELHORIA: Em vez de ir para a lista geral, 
            // vamos direto para o jogo enviando o ID que o banco acabou de gerar
            if (resposta.id_save) {
                window.location.href = "chaveamento6.php?id=" + resposta.id_save;
            } else {
                window.location.href = "meus_campeonatos.php";
            }
        } else {
            alert("Erro ao salvar: " + (resposta ? resposta.mensagem : "Erro desconhecido"));
        }
    }).catch(err => {
        console.error("Erro no processo de salvamento:", err);
        alert("Erro de conexão ao salvar no banco de dados.");
    });
}

/*gera os grupos A e B */ 
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