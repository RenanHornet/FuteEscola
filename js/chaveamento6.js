let modoCartaoAtivo = false;
let cartoesPartida = {}; 
/*Inicialização*/
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idSave = urlParams.get('id');

    if (idSave) {
        fetch(`../php/carregar_progresso.php?id_save=${idSave}`)
            .then(res => res.json())
            .then(res => {
                if (res.status === "sucesso") {
                    //Trata se o banco devolveu string ou objeto puro
                    let dadosDB = res.dados;
                    if (typeof dadosDB === "string") {
                        dadosDB = JSON.parse(dadosDB);
                    }
                    
                    //Limpa dados antigos locais para evitar conflitos
                    localStorage.removeItem("torneioAtual");
                    localStorage.removeItem("artilharia");
                    localStorage.removeItem("semifinal6_dados");

                    //Injeta cada chave de volta no localStorage tratando sub-JSONs
                    Object.keys(dadosDB).forEach(key => {
                        let valor = dadosDB[key];
                        // Se o valor veio como string contendo um JSON (comum no banco), mantém como string pura pro localStorage
                        if (typeof valor === "object" && valor !== null) {
                            localStorage.setItem(key, JSON.stringify(valor));
                        } else {
                            localStorage.setItem(key, valor);
                        }
                    });

                    //Agora que os dados estão perfeitamente restaurados, desenha a tela
                    carregarInterface6();
                } else {
                    alert("Erro ao carregar torneio: " + res.mensagem);
                    carregarInterface6();
                }
            })
            .catch(err => {
                console.error("Erro no fetch de carregamento:", err);
                carregarInterface6();
            });
    } else {
        carregarInterface6();
    }
});

// Função auxiliar para evitar repetição de código
function carregarInterface6() {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    if (dados) {
        renderizarJogos(dados.partidas);
        atualizarClassificacao();
    } else {
        alert("Nenhum dado encontrado para este torneio.");
    }
}
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
/*Atualiza a classifficação por grupos*/
function atualizarClassificacao() {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    let statusGrupos = { A: {}, B: {} };

    // Inicializa os dados
    dados.grupoA.forEach(t => statusGrupos.A[t.time] = { p: 0, sg: 0, gp: 0 });
    dados.grupoB.forEach(t => statusGrupos.B[t.time] = { p: 0, sg: 0, gp: 0 });

    ["A", "B"].forEach(g => {
        dados.partidas[g].forEach(jogo => {
            if (jogo.status === 'f') {
                statusGrupos[g][jogo.t1].sg += (jogo.gols1 - jogo.gols2);
                statusGrupos[g][jogo.t2].sg += (jogo.gols2 - jogo.gols1);
                statusGrupos[g][jogo.t1].gp += jogo.gols1;
                statusGrupos[g][jogo.t2].gp += jogo.gols2;

                if (jogo.gols1 > jogo.gols2) statusGrupos[g][jogo.t1].p += 3;
                else if (jogo.gols2 > jogo.gols1) statusGrupos[g][jogo.t2].p += 3;
                else { statusGrupos[g][jogo.t1].p += 1; statusGrupos[g][jogo.t2].p += 1; }
            }
        });
        
        const tbody = document.querySelector(`#tabela-${g} tbody`);
        
        // Ordenação encadeada padrão
        const ordenado = Object.entries(statusGrupos[g]).sort((a, b) => {
            return b[1].p - a[1].p || b[1].sg - a[1].sg || b[1].gp - a[1].gp;
        });

        // Se o usuário JÁ mexeu manualmente na ordem devido a um empate, vamos respeitar a ordem salva
        // Para isso, vamos ordenar baseando-se na ordem atual que está salva no dados.grupoX
        const listaTimesOriginal = g === "A" ? dados.grupoA : dados.grupoB;
        ordenado.sort((a, b) => {
            // Se as estatísticas forem rigorosamente iguais, decide pela ordem que está salva no array do localStorage
            if (a[1].p === b[1].p && a[1].sg === b[1].sg && a[1].gp === b[1].gp) {
                const idxA = listaTimesOriginal.findIndex(t => t.time === a[0]);
                const idxB = listaTimesOriginal.findIndex(t => t.time === b[0]);
                return idxA - idxB;
            }
            return b[1].p - a[1].p || b[1].sg - a[1].sg || b[1].gp - a[1].gp;
        });

        // Renderiza o HTML com um evento de clique para desempate manual
        tbody.innerHTML = ordenado.map((item, index) => `
            <tr onclick="ajustarPosicaoEmpate('${g}', ${index})" style="cursor: pointer;" title="Em caso de empate absoluto, clique para alternar posição">
                <td>${item[0]}</td>
                <td>${item[1].p}</td>
                <td>${item[1].sg}</td>
                <td>${item[1].gp}</td>
            </tr>
        `).join('');

        // ALERTA DE EMPATE ABSOLUTO
        if (ordenado.length === 3) {
            const t1 = ordenado[0][1];
            const t2 = ordenado[1][1];
            const t3 = ordenado[2][1];

            if (t1.p === t3.p && t1.sg === t3.sg && t1.gp === t3.gp && t1.p > 0) {
                alert(`⚠️ EMPATE ABSOLUTO NO GRUPO ${g}!\n\nOs 3 times terminaram iguais.\n\nRegulamento: Defina o resultado na quadra (pênaltis/sorteio) e depois CLIQUE em cima do nome do time na tabela para ajustar quem fica em 1º, 2º e 3º.`);
            }
            else if (t2.p === t3.p && t2.sg === t3.sg && t2.gp === t3.gp && t2.p > 0) {
                alert(`⚠️ EMPATE ABSOLUTO PELA ÚLTIMA VAGA DO GRUPO ${g}!\n\nRegulamento: Defina na quadra e CLIQUE no time na tabela para alternar as posições se necessário.`);
            }
        }
    });
}

//AJUSTA EMPATE ABSOLUTO (SALDO DE GOLS, PONTOS, GOLS PRÓ)
function ajustarPosicaoEmpate(grupo, indexAtual) {
    const dados = JSON.parse(localStorage.getItem("torneioAtual"));
    const listaTimes = grupo === "A" ? dados.grupoA : dados.grupoB;

    // Se clicou no último colocado (índice 2), altera com o de cima (índice 1)
    let primIdx = indexAtual;
    let segIdx = indexAtual === 2 ? 1 : indexAtual + 1;

    // Inverte os times no array do localStorage
    const temp = listaTimes[primIdx];
    listaTimes[primIdx] = listaTimes[segIdx];
    listaTimes[segIdx] = temp;

    if (grupo === "A") dados.grupoA = listaTimes;
    else dados.grupoB = listaTimes;

    localStorage.setItem("torneioAtual", JSON.stringify(dados));
    
    // Atualiza a tela para mostrar a nova posição
    atualizarClassificacao();

    // Persiste no banco de dados a nova ordem dos times
    if (typeof salvarCampeonato6 === "function") {
        salvarCampeonato6();
    }
}

//LÓGICA DO MODAL (SÚMULA)
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
/*Carrega os jogadores no modal*/
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
/*Cria os botoes dos jogadores*/
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
/*registra gol de acordo com o jogador*/
function registrarGol(nomeJogador) {
    let artilharia = JSON.parse(localStorage.getItem("artilharia")) || {};
    if (!artilharia[nomeJogador]) artilharia[nomeJogador] = 0;
    artilharia[nomeJogador]++;
    localStorage.setItem("artilharia", JSON.stringify(artilharia));
}

/*logica de finalizar a partida e organizar os gols*/
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

    //Salva o estado atualizado no localStorage
    localStorage.setItem("torneioAtual", JSON.stringify(dados));

    //Persiste no banco de dados automaticamente
    if (typeof salvarCampeonato6 === "function") {
        salvarCampeonato6();
        console.log("Progresso salvo automaticamente no banco.");
    }

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
    
    grupo.forEach(t => status[t.time] = { time: t.time, jogadores: t.jogadores, p: 0, sg: 0, gp: 0 });

    partidas.forEach(jogo => {
        if (jogo.status === 'f') {
            status[jogo.t1].sg += (jogo.gols1 - jogo.gols2);
            status[jogo.t2].sg += (jogo.gols2 - jogo.gols1);
            status[jogo.t1].gp += jogo.gols1;
            status[jogo.t2].gp += jogo.gols2;

            if (jogo.gols1 > jogo.gols2) status[jogo.t1].p += 3;
            else if (jogo.gols2 > jogo.gols1) status[jogo.t2].p += 3;
            else { status[jogo.t1].p += 1; status[jogo.t2].p += 1; }
        }
    });

    // Ordena respeitando a ordem física do array original em caso de empate absoluto
    return Object.values(status).sort((a, b) => {
        if (a.p === b.p && a.sg === b.sg && a.gp === b.gp) {
            const idxA = grupo.findIndex(t => t.time === a.time);
            const idxB = grupo.findIndex(t => t.time === b.time);
            return idxA - idxB;
        }
        return b.p - a.p || b.sg - a.sg || b.gp - a.gp;
    });
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

    const urlParams = new URLSearchParams(window.location.search);
    const idSave = urlParams.get('id');
    alert("Fase de grupos concluída! Partiu Semifinais.");
    window.location.href = `../php/semifinal6.php?id=${idSave}`;
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