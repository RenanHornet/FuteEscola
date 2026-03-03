let placarA = 0;
let placarB = 0;
let jogoAtualModal = null;
let todosOsTimes = JSON.parse(localStorage.getItem("times4")) || [];

// Gera o chaveamento inicial (semifinais)
function gerarChaveamento(){
    const container = document.getElementById("chaves");
    container.innerHTML = ""; 

    let times = JSON.parse(localStorage.getItem("times4"));
    if(!times || times.length < 4){
        alert("Cadastre os 4 times para gerar o chaveamento!");
        return;
    }

    // Limpa dados antigos
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("finaisGeradas");
    localStorage.removeItem("finalResults");
    localStorage.removeItem("artilharia");

    // Embaralha times
    times.sort(() => Math.random() - 0.5);

    // Cria jogos da semifinal
    const jogo1 = [times[0], times[1]];
    const jogo2 = [times[2], times[3]];

    criarJogo(container, jogo1, "Semifinal");
    criarJogo(container, jogo2, "Semifinal");
}

// Cria cada jogo no DOM
function criarJogo(container, jogo, fase){
    const div = document.createElement("div");
    div.classList.add("match-box");
    div.innerText = `${jogo[0].time} vs ${jogo[1].time} (${fase})`;

    div.onclick = () => abrirModal(jogo, fase);
    container.appendChild(div);
}

// Abre modal da partida
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

function addGol(time){
    if(time === "A"){
        placarA++;
        document.getElementById("mScoreA").textContent = placarA;
    } else {
        placarB++;
        document.getElementById("mScoreB").textContent = placarB;
    }
}
/*Carrega jogadores no modal*/ 
function carregarJogadoresModal(timeA, timeB){
    const dados = JSON.parse(localStorage.getItem("times4")) || [];

    const objTimeA = dados.find(t => t.time === timeA) || {jogadores: []};
    const objTimeB = dados.find(t => t.time === timeB) || {jogadores: []};

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
/*registra gol do jogador*/ 
function registrarGol(nomeJogador, lado){
    addGol(lado);
    let artilharia = JSON.parse(localStorage.getItem("artilharia")) || {};
    if(!artilharia[nomeJogador]) artilharia[nomeJogador] = 0;
    artilharia[nomeJogador]++;
    localStorage.setItem("artilharia", JSON.stringify(artilharia));
}

// Finaliza partida
function finalizarPartida(){
    const resultado = {
        timeA: jogoAtualModal.jogo[0].time,
        timeB: jogoAtualModal.jogo[1].time,
        golsA: placarA,
        golsB: placarB,
        fase: jogoAtualModal.fase
    };

    let resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    let finaisGeradas = localStorage.getItem("finaisGeradas") === 'true';
    let finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};

    if(jogoAtualModal.fase === "Semifinal"){
        resultadosSemi.push(resultado);
        localStorage.setItem("resultadosSemi", JSON.stringify(resultadosSemi));
        if(resultadosSemi.length === 2) gerarFinais(resultadosSemi);
    } else if(jogoAtualModal.fase === "Final" || jogoAtualModal.fase === "3º lugar"){
        // Define campeão, vice, 3º e 4º
        if(jogoAtualModal.fase === "Final"){
            if(resultado.golsA > resultado.golsB){
                finalResults.campeao = resultado.timeA;
                finalResults.vice = resultado.timeB;
            } else {
                finalResults.campeao = resultado.timeB;
                finalResults.vice = resultado.timeA;
            }
        } else if(jogoAtualModal.fase === "3º lugar"){
            if(resultado.golsA > resultado.golsB){
                finalResults.terceiro = resultado.timeA;
                finalResults.quarto = resultado.timeB;
            } else {
                finalResults.terceiro = resultado.timeB;
                finalResults.quarto = resultado.timeA;
            }
        }
        localStorage.setItem("finalResults", JSON.stringify(finalResults));
        localStorage.setItem("finaisGeradas", "true");
    }

    fecharModal();
}

// Gera final e disputa do 3º lugar
function gerarFinais(resultadosSemi){
    const container = document.getElementById("chaves");
    container.innerHTML = ""; // limpa cards antigos

    const vencedores = [];
    const perdedores = [];

    resultadosSemi.forEach(jogo => {
        let objTimeA = todosOsTimes.find(t => t.time === jogo.timeA);
        let objTimeB = todosOsTimes.find(t => t.time === jogo.timeB);

        if(jogo.golsA > jogo.golsB){
            vencedores.push(objTimeA);
            perdedores.push(objTimeB);
        } else {
            vencedores.push(objTimeB);
            perdedores.push(objTimeA);
        }
    });

    // Cria cards da Final e 3º lugar passando objetos completos
    criarJogo(container, [vencedores[0], vencedores[1]], "Final");
    criarJogo(container, [perdedores[0], perdedores[1]], "3º lugar");
}

// Finaliza torneio e vai para ranking
function finalizarTorneio(){
    const finalResults = JSON.parse(localStorage.getItem("finalResults"));
    if(!finalResults || !finalResults.campeao){
        alert("Finalize todas as partidas para concluir o torneio!");
        return;
    }
    window.location.href = "ranking.html";  
}

// Inicia chaveamento ao carregar
document.addEventListener("DOMContentLoaded", () => {
    gerarChaveamento();
});