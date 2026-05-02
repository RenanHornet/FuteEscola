let modoCartaoAtivo = false;
let cartoesPartida = {}; 
/*Inicialização*/
document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    if (dados) {
        renderizarJogos(dados.partidas);
        atualizarClassificacao();
    }
});

/*desenha a interface*/ 
function renderizarJogos(partidas) {
    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; 

    ["A", "B"].forEach(grupo => {
        const titulo = document.createElement("h4");
        titulo.innerText = `Grupo ${grupo}`;
        container.appendChild(titulo);

        partidas[grupo].forEach((jogo, index) => {
            const placar = jogo.status === 'f' ? `${jogo.gols1} x ${jogo.gols2}` : "vs";
            
            const div = document.createElement("div");
            div.className = "match-box";
            //Destaca o jogo já finalizado
            if (jogo.status === 'f') {
                div.classList.add("finalizado"); 
            }

            div.innerHTML = `<span>${jogo.t1}</span> <strong>${placar}</strong> <span>${jogo.t2}</span>`;
            
            div.onclick = () => {
                // Bloqueia a abertura do modal se o status for 'f'
                if (jogo.status === 'f') {
                    alert("Resultado já registrado!");
                    return;
                }
                abrirModalSúmula(grupo, index);
            };
            
            container.appendChild(div);
        });
    });
}
function atualizarClassificacao() {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    let statusGrupos = { A: {}, B: {} };

    dados.grupoA.forEach(t => statusGrupos.A[t.time] = { p: 0, sg: 0 });
    dados.grupoB.forEach(t => statusGrupos.B[t.time] = { p: 0, sg: 0 });

    ["A", "B"].forEach(g => {
        dados.partidas[g].forEach(jogo => {
            if (jogo.status === 'f') {
                statusGrupos[g][jogo.t1].sg += (jogo.gols1 - jogo.gols2);
                statusGrupos[g][jogo.t2].sg += (jogo.gols2 - jogo.gols1);
                if (jogo.gols1 > jogo.gols2) statusGrupos[g][jogo.t1].p += 3;
                else if (jogo.gols2 > jogo.gols1) statusGrupos[g][jogo.t2].p += 3;
                else { statusGrupos[g][jogo.t1].p += 1; statusGrupos[g][jogo.t2].p += 1; }
            }
        });
        
        const tbody = document.querySelector(`#tabela-${g} tbody`);
        const ordenado = Object.entries(statusGrupos[g]).sort((a, b) => b[1].p - a[1].p || b[1].sg - a[1].sg);
        tbody.innerHTML = ordenado.map(item => `
            <tr><td>${item[0]}</td><td>${item[1].p}</td><td>${item[1].sg}</td></tr>
        `).join('');
    });
}

// --- PARTE 3: LÓGICA DO MODAL (SÚMULA) ---
let jogoAtual = null; 

function abrirModalSúmula(grupo, index) {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    const jogo = dados.partidas[grupo][index];
    jogoAtual = { grupo, index }; 

    document.getElementById("mTimeA").innerText = jogo.t1;
    document.getElementById("mTimeB").innerText = jogo.t2;
    document.getElementById("mScoreA").innerText = "0";
    document.getElementById("mScoreB").innerText = "0";

    carregarJogadoresModal(jogo.t1, jogo.t2);

    document.getElementById("modalPartida").style.display = "flex";
}

function carregarJogadoresModal(timeA, timeB) {
    const dadosGeral = JSON.parse(localStorage.getItem("torneioAtual"));
    // Une os grupos para não dar erro de busca
    const todosOsTimes = [...dadosGeral.grupoA, ...dadosGeral.grupoB];

    const objTimeA = todosOsTimes.find(t => t.time === timeA) || { jogadores: [] };
    const objTimeB = todosOsTimes.find(t => t.time === timeB) || { jogadores: [] };

    // Aqui ela distribui as tarefas para a função de cima
    criarBotoesGols(objTimeA.jogadores, "jogadoresA", "mScoreA", "jogador-btn");
    criarBotoesGols(objTimeB.jogadores, "jogadoresB", "mScoreB", "jogador-btn2");
}

function criarBotoesGols(jogadores, containerId, placarId, classeCor) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 

    jogadores.forEach(nome => {
        const btn = document.createElement("button");
        btn.className = classeCor; 
        btn.innerText = nome;
        
        btn.onclick = () => {
            // Modo cartão: verifica se o interruptor está ligado
            if (modoCartaoAtivo) {
                const timeLetra = (containerId === "jogadoresA") ? "A" : "B";
                aplicarCartao(nome, timeLetra, btn);
            } 
            else {
                // Lógica do gol: executada se o modo cartão estiver OFF
                let placar = document.getElementById(placarId);
                placar.innerText = parseInt(placar.innerText) + 1;
                registrarGol(nome); 
            }
        };
        
        container.appendChild(btn);
    });
}

function registrarGol(nomeJogador) {
    let artilharia = JSON.parse(localStorage.getItem("artilharia")) || {};
    if (!artilharia[nomeJogador]) artilharia[nomeJogador] = 0;
    artilharia[nomeJogador]++;
    localStorage.setItem("artilharia", JSON.stringify(artilharia));
}


function finalizarPartida() {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    const { grupo, index } = jogoAtual;

    dados.partidas[grupo][index].gols1 = parseInt(document.getElementById("mScoreA").innerText);
    dados.partidas[grupo][index].gols2 = parseInt(document.getElementById("mScoreB").innerText);
    dados.partidas[grupo][index].status = 'f';

    localStorage.setItem("torneioAtual", JSON.stringify(dados));
    fecharModal();
    renderizarJogos(dados.partidas);
    atualizarClassificacao();
}

function fecharModal() {
    document.getElementById("modalPartida").style.display = "none";
    modoCartaoAtivo = false;
    cartoesPartida = {}; // Zera os cartões daquela partida específica
}


/* Função auxiliar para calcular o ranking e retornar os times ordenados */
function obterClassificacao(grupo, partidas) {
    let status = {};
    
    // Inicializa
    grupo.forEach(t => status[t.time] = { time: t.time, jogadores: t.jogadores, p: 0, sg: 0 });

    // Calcula
    partidas.forEach(jogo => {
        if (jogo.status === 'f') {
            status[jogo.t1].sg += (jogo.gols1 - jogo.gols2);
            status[jogo.t2].sg += (jogo.gols2 - jogo.gols1);
            if (jogo.gols1 > jogo.gols2) status[jogo.t1].p += 3;
            else if (jogo.gols2 > jogo.gols1) status[jogo.t2].p += 3;
            else { status[jogo.t1].p += 1; status[jogo.t2].p += 1; }
        }
    });

    // Ordena e retorna o objeto completo do time (para não perder os jogadores)
    return Object.values(status).sort((a, b) => b.p - a.p || b.sg - a.sg);
}

/* Função que conclui a fase de grupos*/
function concluirFaseDeGrupos() { 
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    
    // Verifica se todos os jogos foram finalizados 
    const todosFinalizados = [...dados.partidas.A, ...dados.partidas.B].every(j => j.status === 'f');
    if(!todosFinalizados) {
        alert("Finalize todos os jogos da fase de grupos antes de prosseguir!");
        return;
    }

    // Pega resultados ordenados
    const rankA = obterClassificacao(dados.grupoA, dados.partidas.A);
    const rankB = obterClassificacao(dados.grupoB, dados.partidas.B);

    // Monta os objetos da semifinal (passando o objeto completo do time)
    const semifinalistas = {
        jogo1: [rankA[0], rankB[1]], // 1ºA x 2ºB
        jogo2: [rankB[0], rankA[1]]  // 1ºB x 2ºA
    };

    localStorage.setItem("semifinal6_dados", JSON.stringify(semifinalistas));
    alert("Fase de grupos concluída! Partiu Semifinais.");
    window.location.href = "semifinal6.php";
}

/*Função de cartões amarelos*/ 
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
    alternarModoCartao(); // Desativa o modo após o uso
}