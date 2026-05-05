let placarA = 0;
let placarB = 0;
let jogoAtualModal = null;
let todosOsTimes = JSON.parse(localStorage.getItem("times4")) || [];
let modoCartaoAtivo = false;
let cartoesPartida = {}; // Armazena quantos cartões cada jogador tem na partida atual

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

/*Cria cada jogo no DOM*/
function criarJogo(container, jogo, fase){
    const div = document.createElement("div");
    div.classList.add("match-box");
    
    const jogoID = `${jogo[0].time}-${jogo[1].time}`;
    div.setAttribute("data-id", jogoID);

    div.innerText = `${jogo[0].time} vs ${jogo[1].time} (${fase})`;

    // Se o jogo já estiver no localStorage (caso o user dê F5), já nasce verde
    let resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    if(resultadosSemi.some(r => r.timeA === jogo[0].time && r.timeB === jogo[1].time)) {
        div.classList.add("finalizado");
    }

    div.onclick = () => abrirModal(jogo, fase);
    container.appendChild(div);
}

/*abre o modal*/
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
    // Reset de segurança dos cartões 
    modoCartaoAtivo = false; 
    cartoesPartida = {};     
    
    const btnToggle = document.getElementById("btn-modo-cartao");
    if (btnToggle) {
        btnToggle.classList.remove("ativo");
        btnToggle.innerText = "Modo Cartão: OFF";
    }
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
function carregarJogadoresModal(timeA, timeB) {
    const dados = JSON.parse(localStorage.getItem("times4")) || [];

    const objTimeA = dados.find(t => t.time === timeA) || { jogadores: [] };
    const objTimeB = dados.find(t => t.time === timeB) || { jogadores: [] };

    const divA = document.getElementById("jogadoresA");
    const divB = document.getElementById("jogadoresB");

    divA.innerHTML = "";
    divB.innerHTML = "";

    // Lógica para o Time A
    objTimeA.jogadores.forEach(jogador => {
        const btn = document.createElement("button");
        btn.textContent = jogador;
        btn.classList.add("jogador-btn");
        
        // Sistema de cartões para o time A 
        btn.onclick = () => {
            if (modoCartaoAtivo) {
                aplicarCartao(jogador, "A", btn);
            } else {
                registrarGol(jogador, "A");
            }
        };
        
        divA.appendChild(btn);
    });

    // Lógica para o Time B
    objTimeB.jogadores.forEach(jogador => {
        const btn = document.createElement("button");
        btn.textContent = jogador;
        btn.classList.add("jogador-btn2");
        
        // Sistema de cartões para o time B 
        btn.onclick = () => {
            if (modoCartaoAtivo) {
                aplicarCartao(jogador, "B", btn);
            } else {
                registrarGol(jogador, "B");
            }
        };
        
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
    let finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};

    if(jogoAtualModal.fase === "Semifinal"){
        resultadosSemi.push(resultado);
        localStorage.setItem("resultadosSemi", JSON.stringify(resultadosSemi));
        if(resultadosSemi.length === 2) gerarFinais(resultadosSemi);
    } else if(jogoAtualModal.fase === "Final" || jogoAtualModal.fase === "3º lugar"){
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

    const jogoID = `${resultado.timeA}-${resultado.timeB}`;
    const card = document.querySelector(`[data-id="${jogoID}"]`);
    if(card) {
        card.classList.add("finalizado"); 
    }

    fecharModal();
}
/*gera finais*/
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
    window.location.href = "../php/ranking.php";  
}

// Inicia chaveamento ao carregar
document.addEventListener("DOMContentLoaded", () => {
    gerarChaveamento();
});

/*Implementação do modo cartão*/
function alternarModoCartao() {
    modoCartaoAtivo = !modoCartaoAtivo;
    const btn = document.getElementById("btn-modo-cartao");
    
    if (modoCartaoAtivo) {
        btn.classList.add("ativo");
        btn.innerText = "Modo Cartão: ON 🟨";
    } else {
        btn.classList.remove("ativo");
        btn.innerText = "Modo Cartão: OFF";
    }
}


function aplicarCartao(nomeJogador, timeLetra, elementoBotao) {

    const idUnico = `${timeLetra}-${nomeJogador}`;

    // Se o jogador ainda não tem registro de cartões, iniciamos com 0
    if (!cartoesPartida[idUnico]) {
        cartoesPartida[idUnico] = 0;
    }

    // Incrementa a contagem
    cartoesPartida[idUnico]++;

    if (cartoesPartida[idUnico] === 1) {
        // REGRA: 1º Cartão Amarelo
        elementoBotao.classList.add("nome-amarelo");
    } 
    else if (cartoesPartida[idUnico] >= 2) {
        // REGRA: 2º Amarelo = Vermelho (Expulsão)
        elementoBotao.classList.remove("nome-amarelo");
        elementoBotao.classList.add("nome-vermelho");
        
        // Desabilita o botão para que não possa mais marcar gols
        elementoBotao.disabled = true; 
        
        alert(`O jogador ${nomeJogador} do Time ${timeLetra} foi expulso!`);
    }

    // Após aplicar a punição, desativa o "Modo Cartão" automaticamente
    // para que o próximo clique volte a ser registro de GOL.
    alternarModoCartao();
}