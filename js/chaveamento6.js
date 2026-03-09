// --- PARTE 1: INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    if (dados) {
        renderizarJogos(dados.partidas);
        atualizarClassificacao();
    }
});

// --- PARTE 2: DESENHAR INTERFACE (DOM) ---
function renderizarJogos(partidas) {
    const container = document.getElementById("lista-jogos");
    container.innerHTML = ""; // Limpa tudo

    ["A", "B"].forEach(grupo => {
        // Criar o título do grupo como um elemento
        const titulo = document.createElement("h4");
        titulo.innerText = `Grupo ${grupo}`;
        container.appendChild(titulo);

        partidas[grupo].forEach((jogo, index) => {
            const placar = jogo.status === 'f' ? `${jogo.gols1} x ${jogo.gols2}` : "vs";
            
            const div = document.createElement("div");
            div.className = "match-box";
            // Usamos innerHTML apenas para o conteúdo interno do card
            div.innerHTML = `<span>${jogo.t1}</span> <strong>${placar}</strong> <span>${jogo.t2}</span>`;
            
            // Adicionamos o clique diretamente no objeto div
            div.onclick = () => abrirModalSúmula(grupo, index);
            
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

    const time1Dados = dados[`grupo${grupo}`].find(t => t.time === jogo.t1);
    const time2Dados = dados[`grupo${grupo}`].find(t => t.time === jogo.t2);

    criarBotoesGols(time1Dados.jogadores, "jogadoresA", "mScoreA");
    criarBotoesGols(time2Dados.jogadores, "jogadoresB", "mScoreB");

    document.getElementById("modalPartida").style.display = "flex";
}

function criarBotoesGols(jogadores, containerId, placarId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 
    jogadores.forEach(nome => {
        const btn = document.createElement("button");
        btn.className = "jogador-btn";
        btn.innerText = nome;
        btn.onclick = () => {
            let placar = document.getElementById(placarId);
            placar.innerText = parseInt(placar.innerText) + 1;
        };
        container.appendChild(btn);
    });
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
    window.location.href = "semifinal6.html";
}