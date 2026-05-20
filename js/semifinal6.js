let modoCartaoAtivo = false;
let cartoesPartida = {};

/* Puxa as informações da semifinal */
let jogoAtualModal = null;
let placarA = 0;
let placarB = 0;    

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idSave = urlParams.get('id');

    if (idSave) {
        fetch(`../php/carregar_progresso.php?id_save=${idSave}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === "sucesso") {
                    const dadosDB = typeof res.dados === "string" ? JSON.parse(res.dados) : res.dados;
                    // Restaura o backup do banco de forma limpa no localStorage
                    Object.keys(dadosDB).forEach(key => localStorage.setItem(key, dadosDB[key]));
                    
                    verificarEFluxoInterface();
                }
            })
            .catch(err => console.error("Erro ao carregar do banco:", err));
    } else {
        verificarEFluxoInterface();
    }
});

// CORREÇÃO CRÍTICA: Decide inteligentemente se exibe as semifinais ou se pula direto para as Finais salvas
function verificarEFluxoInterface() {
    const resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    const dadosSemis = JSON.parse(localStorage.getItem("semifinal6_dados"));

    if (!dadosSemis) {
        alert("Dados das semifinais não encontrados!");
        return;
    }

    // Se já existirem as 2 semifinais jogadas e salvas, gera a tela direto com as Finais
    if (resultadosSemi.length === 2) {
        gerarFinais(resultadosSemi);
    } else {
        renderizarSemifinais(dadosSemis);
    }
}
/*Renderiza as semifinais*/
function renderizarSemifinais(dados) {
    const container = document.getElementById("chaves");
    container.innerHTML = "";

    const jogos = [
        {times: dados.jogo1, fase: "Semifinal 1"},
        {times: dados.jogo2, fase: "Semifinal 2"}
    ];

    jogos.forEach((j) => {
        criarJogo(container, j.times, j.fase);
    });
}
/*Cria o elemento do jogo*/ 
function criarJogo(container, jogo, fase) {
    const div = document.createElement("div");
    div.className = "match-box";
    
    const jogoID = `${fase}-${jogo[0].time}-${jogo[1].time}`;
    div.setAttribute("data-id", jogoID);
    
    div.innerHTML = `<strong>${fase}</strong><br>${jogo[0].time} vs ${jogo[1].time}`;

    const resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    const finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};

    const jaFinalizado = resultadosSemi.some(r => r.fase === fase && r.timeA === jogo[0].time) || 
                         (fase === "Final" && finalResults.campeao) || 
                         (fase === "3º lugar" && finalResults.terceiro);

    if (jaFinalizado) {
        div.classList.add("finalizado");
    }

    div.onclick = () => {
        if (div.classList.contains("finalizado")) {
            alert("Partida já encerrada!");
            return;
        }
        abrirModal(jogo, fase);
    };
    
    container.appendChild(div);
}

/* --- Lógicas do modal de partida --- */
/*Cria o modal de registro de partida*/ 
function abrirModal(jogo, fase){
    jogoAtualModal = { juego: jogo, fase };

    placarA = 0;
    placarB = 0;
    
    document.getElementById("mTimeA").textContent = jogo[0].time;
    document.getElementById("mTimeB").textContent = jogo[1].time;
    document.getElementById("mScoreA").textContent = 0;
    document.getElementById("mScoreB").textContent = 0;

    carregarJogadoresModal(jogo[0].time, jogo[1].time);
    document.getElementById("modalPartida").style.display = "flex";
}
/*Fecha o modal*/
function fecharModal(){
    document.getElementById("modalPartida").style.display = "none";
    placarA = 0; 
    placarB = 0; 
    modoCartaoAtivo = false;
    cartoesPartida = {};
}
/*Carrega os jogadores no modal*/ 
function carregarJogadoresModal(timeA, timeB) {
    const dadosGeral = JSON.parse(localStorage.getItem("torneioAtual"));
    const todosOsTimes = [...dadosGeral.grupoA, ...dadosGeral.grupoB];

    const objTimeA = todosOsTimes.find(t => t.time === timeA) || { jogadores: [] };
    const objTimeB = todosOsTimes.find(t => t.time === timeB) || { jogadores: [] };

    criarBotoesGols(objTimeA.jogadores, "jogadoresA", "mScoreA", "jogador-btn");
    criarBotoesGols(objTimeB.jogadores, "jogadoresB", "mScoreB", "jogador-btn2");
}
/*Cria o botão dos jogadores*/
function criarBotoesGols(jogadores, containerId, placarId, classeCor) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 

    jogadores.forEach(nome => {
        const btn = document.createElement("button");
        btn.className = classeCor; 
        btn.innerText = nome;
        
        btn.onclick = () => {
            if (modoCartaoAtivo) {
                const timeLetra = (containerId === "jogadoresA") ? "A" : "B";
                aplicarCartao(nome, timeLetra, btn);
            } 
            else {
                const lado = (containerId === "jogadoresA") ? "A" : "B";
                registrarGol(nome, lado); 
            }
        };
        container.appendChild(btn);
    });
}
/*Registra os gols dos jogadores*/ 
function registrarGol(nomeJogador, lado) {
    if (lado === "A") {
        placarA++;
        document.getElementById("mScoreA").textContent = placarA;
    } else {
        placarB++;
        document.getElementById("mScoreB").textContent = placarB;
    }

    let artilharia = JSON.parse(localStorage.getItem("artilharia")) || {};
    if (!artilharia[nomeJogador]) artilharia[nomeJogador] = 0;
    artilharia[nomeJogador]++;
    localStorage.setItem("artilharia", JSON.stringify(artilharia));
}
/*Finaliza a partida e salva os resultados*/
function finalizarPartida() {
    if (placarA === placarB) {
        alert("A partida está empatada! \nDe acordo com o regulamento, realize as penalidades alternadas.");
        return;
    }

    const resultado = {
        timeA: jogoAtualModal.juego[0].time,
        timeB: jogoAtualModal.juego[1].time,
        golsA: placarA,
        golsB: placarB,
        fase: jogoAtualModal.fase
    };

    let resultadosSemi = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    let finalResults = JSON.parse(localStorage.getItem("finalResults")) || {};

    if (jogoAtualModal.fase.includes("Semifinal")) {
        resultadosSemi.push(resultado);
        localStorage.setItem("resultadosSemi", JSON.stringify(resultadosSemi));
        
        // CORREÇÃO CRÍTICA: Salva no banco de dados imediatamente ao fim da semifinal
        if (typeof salvarCampeonato6 === "function") {
            salvarCampeonato6().then(() => {
                if (resultadosSemi.length === 2) {
                    gerarFinais(resultadosSemi);
                }
            });
        } else if (resultadosSemi.length === 2) {
            gerarFinais(resultadosSemi);
        }
    } else {
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

        if (typeof salvarCampeonato6 === "function") {
            salvarCampeonato6();
            console.log("Resultados salvos!");
        } 
    }

    const jogoID = `${jogoAtualModal.fase}-${jogoAtualModal.juego[0].time}-${jogoAtualModal.juego[1].time}`;
    const card = document.querySelector(`[data-id="${jogoID}"]`);
    if (card) {
        card.classList.add("finalizado");
    }

    fecharModal();
}
/*Gera as finais*/
function gerarFinais(resultadosSemi) {
    const container = document.getElementById("chaves");
    container.innerHTML = "<h2 style='grid-column: 1/-1; text-align:center;'>Finais Disponíveis</h2>"; 

    const vencedores = [];
    const perdedores = [];

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

    // Gera os novos cards na tela
    criarJogo(container, [vencedores[0], vencedores[1]], "Final");
    criarJogo(container, [perdedores[0], perdedores[1]], "3º lugar");
}
/*FInaliza e vai pro ranking*/
function finalizarTorneio() {
    const finalResults = JSON.parse(localStorage.getItem("finalResults"));
    if (!finalResults || !finalResults.campeao || !finalResults.terceiro) {
        alert("Finalize a Final e a Disputa de 3º lugar para encerrar o campeonato!");
        return;
    }
    window.location.href = "../php/ranking.php";
}

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
    if (!cartoesPartida[idUnico]) cartoesPartida[idUnico] = 0;
    
    cartoesPartida[idUnico]++;

    if (cartoesPartida[idUnico] === 1) {
        elementoBotao.classList.add("nome-amarelo");
    } else if (cartoesPartida[idUnico] >= 2) {
        elementoBotao.classList.remove("nome-amarelo");
        elementoBotao.classList.add("nome-vermelho");
        elementoBotao.disabled = true; 
        alert(`O jogador ${nomeJogador} foi expulso!`);
    }
    alternarModoCartao();
}