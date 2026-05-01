
function limparDadosAntigos() {
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("times4");
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
        alert("Erro: Você precisa preencher os dados do 6º time antes de finalizar!");
        return;
    }

    limparDadosAntigos(); 
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
    window.location.href = "chaveamento6.php";
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