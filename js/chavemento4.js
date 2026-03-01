/*Função que gera o chaveamento*/ 
function gerarChaveamento(){
    const container = document.getElementById("chaves");
    container.innerHTML = ""; 

    let times = JSON.parse(localStorage.getItem("times4"));

    if(!times || times.length < 4){
        alert("cCadastre os 4 times para gerar o chaveamento!");
        return;
    }

    //limpa dados antigos do torneio
    localStorage.removeItem("resultadosSemi");
    localStorage.removeItem("finaisGeradas");

    /*Embaralhar times*/
    times.sort(() => Math.random() - 0.5);

    /*Gerar chaveamento*/
    const jogo1 = [times[0], times[1]];
    const jogo2 = [times[2], times[3]];

    criarJogo(container, jogo1);
    criarJogo(container, jogo2);
}

/*Cria os jogos no container do chaveamento*/ 
function criarJogo(container, jogo){
    const div = document.createElement("div");
    div.classList.add("match-box");
    div.innerText = `${jogo[0].time} vs ${jogo[1].time}`;

    div.onclick = () => {
        localStorage.setItem("jogoAtual", JSON.stringify(jogo)); 
        abrirModal(jogo); 
    };

    container.appendChild(div);
}

/*Função que carrega os times no placar da partida*/ 
function carregarPartida() {
    const jogo = JSON.parse(localStorage.getItem("jogoAtual"));

    if(!jogo) return;

    document.getElementById("timeA").textContent = jogo[0].time;
    document.getElementById("timeB").textContent = jogo[1].time;
}


/*Modal da partida*/


let jogoAtualModal = null;

function abrirModal(jogo){
    jogoAtualModal = jogo;

    document.getElementById("mTimeA").textContent = jogo[0].time;
    document.getElementById("mTimeB").textContent = jogo[1].time;
    document.getElementById("mScoreA").textContent = 0;
    document.getElementById("mScoreB").textContent = 0;

    document.getElementById("modalPartida").style.display = "flex";
}

function fecharModal(){
    document.getElementById("modalPartida").style.display = "none";
}

function addGol(time){
    if(time === "A"){
        let scoreA = document.getElementById("mScoreA");
        scoreA.textContent = parseInt(scoreA.textContent) + 1;
    } else {
        let scoreB = document.getElementById("mScoreB");
        scoreB.textContent = parseInt(scoreB.textContent) + 1;
    }
}
/*função que finaliza a partida*/
function finalizarPartida(){
    const resultado = {
        timeA: jogoAtualModal[0].time,
        timeB: jogoAtualModal[1].time,
        golsA: parseInt(document.getElementById("mScoreA").textContent),
        golsB: parseInt(document.getElementById("mScoreB").textContent)
    };

    //obtem resultados anteriores
    let resultados = JSON.parse(localStorage.getItem("resultadosSemi")) || [];
    resultados.push(resultado);
    localStorage.setItem("resultadosSemi", JSON.stringify(resultados));

    
    gerarFinaisSePossivel();

    fecharModal();
}

/*função para gerar finais 4 times*/ 
function gerarFinaisSePossivel(){
    const resultados = JSON.parse(localStorage.getItem("resultadosSemi"));
    const finaisGeradas = localStorage.getItem("finaisGeradas");

    if(finaisGeradas === 'true') return; //final já gerada
    if(!resultados || resultados.length < 2){
        return; //ainda ocorrendo as semifinais
    }

    const vencedores = [];
    const perdedores = [];

    resultados.forEach(jogo => {
        if(jogo.golsA > jogo.golsB){
            vencedores.push(jogo.timeA);
            perdedores.push(jogo.timeB);
        } else {
            vencedores.push(jogo.timeB);
            perdedores.push(jogo.timeA);
        }
    });

    criarCardFinal(vencedores[0], vencedores[1]);
    criarCardterceiro(perdedores[0], perdedores[1]);

    localStorage.setItem("finaisGeradas", 'true');
}

/*função para criar card da final*/
function criarCardFinal(time1, time2){
    const container = document.getElementById("chaves");

    const titulo = document.createElement("h3");
    titulo.textContent = "Final";
    container.appendChild(titulo);

    const div = document.createElement("div");
    div.classList.add("match-box");
    div.innerText = `${time1} vs ${time2}`;

    div.onclick = () => abrirModal([
        {time: time1},
        {time: time2}
    ]);

    container.appendChild(div);
}   

/*função para criar card do terceiro lugar*/
function criarCardterceiro(time1, time2){
    const container = document.getElementById("chaves");

    const titulo = document.createElement("h3");
    titulo.textContent = "3º lugar";
    container.appendChild(titulo);

    const div = document.createElement("div");
    div.classList.add("match-box");
    div.innerText = `${time1} vs ${time2}`;

    div.onclick = () => abrirModal([
        {time: time1},
        {time: time2}
    ]);

    container.appendChild(div);
}

/*até aqui fecha o torneio de mata-mata simples (4 times)*/ 