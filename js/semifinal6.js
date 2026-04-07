/*puxa as informações da semifinal*/
let jogoAtualModal = null;
let placarA = 0;
let placarB = 0;    

document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem("semifinal6_dados"));
    localStorage.removeItem("resultadosSemi"); 
    localStorage.removeItem("finalResults");
    if (!dados) {
        alert("Dados da seminfinal não encontrados!");
        window.location.href = "chaveamento6.php";
        return;
    }
    renderizarSemifinais(dados);
});

function renderizarSemifinais(dados) {
    const container = document.getElementById("chaves");
    container.innerHTML = "";

    const jogos = [
        {times: dados.jogo1, fase: "Semifinal 1"},
        {times: dados.jogo2, fase: "Semifinal 2"}
    ];

    jogos.forEach((j, index) => {
        const div = document.createElement("div");
        div.className = "match-box";
        div.innerHTML = `<strong>${j.fase}</strong><br>${j.times[0].time} vs ${j.times[1].time}`;
        div.onclick = () => abrirModal(j.times, j.fase);
        container.appendChild(div);
    });
}

/*funções do modal de partida(mesmo que o do mata-mata)*/
function abrirModal(jogo, fase){
    jogoAtualModal = { jogo, fase };

    placarA = 0;
    placarB = 0;
    
    document.getElementById("mTimeA").textContent = jogo[0].time;
    document.getElementById("mTimeB").textContent = jogo[1].time;
    document.getElementById("mScoreA").textContent = 0;
    document.getElementById("mScoreB").textContent = 0;

    carregarJogadoresModal(jogo[0].time, jogo[1].time);
    document.getElementById("modalPartida").style.display = "flex";
}

function fecharModal(){
    document.getElementById("modalPartida").style.display = "none";
}

function carregarJogadoresModal(timeA, timeB) {
    // Busca a lista completa dos 6 times para achar os jogadores
    const dadosGeral = JSON.parse(localStorage.getItem("torneioAtual"));
    const todosOsTimes = [...dadosGeral.grupoA, ...dadosGeral.grupoB];

    const objTimeA = todosOsTimes.find(t => t.time === timeA) || { jogadores: [] };
    const objTimeB = todosOsTimes.find(t => t.time === timeB) || { jogadores: [] };

    const divA = document.getElementById("jogadoresA");
    const divB = document.getElementById("jogadoresB");

    divA.innerHTML = "";
    divB.innerHTML = "";

    objTimeA.jogadores.forEach(jogador => {
        const btn = document.createElement("button");
        btn.textContent = jogador;
        btn.classList.add("jogador-btn");
        btn.onclick = () => registrarGol(jogador, "A");
        divA.appendChild(btn);
    });

    objTimeB.jogadores.forEach(jogador => {
        const btn = document.createElement("button");
        btn.textContent = jogador;
        btn.classList.add("jogador-btn2");
        btn.onclick = () => registrarGol(jogador, "B");
        divB.appendChild(btn);
    });
}

function addGol(lado) {
    if (lado === "A") {
        placarA++;
        document.getElementById("mScoreA").textContent = placarA;
    } else {
        placarB++;
        document.getElementById("mScoreB").textContent = placarB;
    }
}

function registrarGol(nomeJogador, lado) {
    addGol(lado);
    let artilharia = JSON.parse(localStorage.getItem("artilharia")) || {};
    if (!artilharia[nomeJogador]) artilharia[nomeJogador] = 0;
    artilharia[nomeJogador]++;
    localStorage.setItem("artilharia", JSON.stringify(artilharia));
}

/*Gera as finais*/
function finalizarPartida() {
    const resultado = {
        timeA: jogoAtualModal.jogo[0].time,
        timeB: jogoAtualModal.jogo[1].time,
        golsA: placarA,
        golsB: placarB,
        fase: jogoAtualModal.fase
    };

    let resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    let finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};

    if (jogoAtualModal.fase.includes("Semifinal")) {
        resultadosSemi.push(resultado);
        localStorage.setItem("resultadosSemi", JSON.stringify(resultadosSemi));
        
        // Se já tivemos os 2 jogos da semi, gera a Final e 3º lugar
        if (resultadosSemi.length === 2) {
            gerarFinais(resultadosSemi);
        }
    } else {
        // Lógica para Final e 3º Lugar
        if (jogoAtualModal.fase === "Final") {
            if (resultado.golsA > resultado.golsB) {
                finalResults.campeao = resultado.timeA;
                finalResults.vice = resultado.timeB;
            } else {
                finalResults.campeao = resultado.timeB;
                finalResults.vice = resultado.timeA;
            }
        } else if (jogoAtualModal.fase === "3º lugar") {
            if (resultado.golsA > resultado.golsB) {
                finalResults.terceiro = resultado.timeA;
                finalResults.quarto = resultado.timeB;
            } else {
                finalResults.terceiro = resultado.timeB;
                finalResults.quarto = resultado.timeA;
            }
        }
        localStorage.setItem("finalResults", JSON.stringify(finalResults));
    }
    fecharModal();
}

function gerarFinais(resultadosSemi) {
    const container = document.getElementById("chaves");
    container.innerHTML = "<h2>Finais</h2>"; 

    const vencedores = [];
    const perdedores = [];

    //objetos do time para pegar os jogadores
    const dadosGeral = JSON.parse(localStorage.getItem("torneioAtual"));
    const todosOsTimes = [...dadosGeral.grupoA, ...dadosGeral.grupoB];

    resultadosSemi.forEach(jogo => {
        let objTimeA = todosOsTimes.find(t => t.time === jogo.timeA);
        let objTimeB = todosOsTimes.find(t => t.time === jogo.timeB);

        if (jogo.golsA > jogo.golsB) {
            vencedores.push(objTimeA);
            perdedores.push(objTimeB);
        } else {
            vencedores.push(objTimeB);
            perdedores.push(objTimeA);
        }
    });

    // Cria os cards finais no DOM
    criarJogo(container, [vencedores[0], vencedores[1]], "Final");
    criarJogo(container, [perdedores[0], perdedores[1]], "3º lugar");
}

function criarJogo(container, jogo, fase) {
    const div = document.createElement("div");
    div.className = "match-box";
    div.innerHTML = `<strong>${fase}</strong><br>${jogo[0].time} vs ${jogo[1].time}`;
    div.onclick = () => abrirModal(jogo, fase);
    container.appendChild(div);
}

/*Finaliza o torneio e salva os resultados*/
function finalizarTorneio() {
    const finalResults = JSON.parse(localStorage.getItem("finalResults"));
    if (!finalResults || !finalResults.campeao || !finalResults.terceiro) {
        alert("Finalize a Final e a Disputa de 3º lugar!");
        return;
    }
    window.location.href = "ranking.php";
}
