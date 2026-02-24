
/* Controle das telas */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    /* Sidebar só aparece fora do login/cadastro */
    if (id === "login" || id === "cadastro") {
        document.getElementById("navbar").style.display = "none";
    } else {
        document.getElementById("navbar").style.display = "flex";
    }
}

/* Função LOGIN */
function entrar() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "" || p === "") {
        alert("Preencha todos os campos!");
        return;
    }

    showScreen("home"); 
}

/* Função CADASTRO */
function cadastrar() {
    let u = document.getElementById("c_user").value;
    let e = document.getElementById("c_email").value;
    let p = document.getElementById("c_pass").value;

    if (u === "" || e === "" || p === "") {
        alert("Preencha todos os campos!");
        return;
    }

    alert("Cadastro efetuado com sucesso!");
    showScreen("login");
}

/* Placar */
function addA() {
    let a = document.getElementById("scoreA");
    a.textContent = parseInt(a.textContent) + 1;
}

function addB() {
    let b = document.getElementById("scoreB");
    b.textContent = parseInt(b.textContent) + 1;
}

function zerarPlacar() {
    document.getElementById("scoreA").textContent = 0;
    document.getElementById("scoreB").textContent = 0;
}

function selecionarFormato(qtdTimes) {
    if (qtdTimes === 4) {
        window.location.href = "times4.html";
    } else {
        window.location.href = "times8.html";
    }
}
/* Função sorteio de times mata-mata */
function salvarTimes4(){
    const times = [];

    document.querySelectorAll(".card-time").forEach((card) => {
        const inputs = card.querySelectorAll("input");

        const nomeTime = inputs[0].value.trim();
        const jogadores = [];

        for(let i = 1; i < inputs.length; i++){
            if(inputs[i].value.trim() !== ""){
                jogadores.push(inputs[i].value.trim());
            }
        }

        if(nomeTime !== ""){
            times.push({
                time: nomeTime,
                jogadores: jogadores
            });
        }
    });

    /*validação*/
    if(times.length < 4){
        alert("Cadastre os 4 times para gerar o chaveamento!");
        return;
    }

    /*embaralhar (shuffle)*/
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [times[i], times[j]] = [times[j], times[i]];
    }

    /*salva no navegador*/
    localStorage.setItem("times4", JSON.stringify(times));

    /*redireciona*/
    window.location.href = "chaveamento.html";
}

/*Função que gera o chaveamento*/ 
function gerarChaveamento(){
    const container = document.getElementById("chaves");
    container.innerHTML = ""; 

    let times = JSON.parse(localStorage.getItem("times4"));

    if(!times || times.length < 4){
        alert("cCadastre os 4 times para gerar o chaveamento!");
        return;
    }

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

function finalizarPartida(){
    const resultado = {
        timeA: jogoAtualModal[0].time,
        timeB: jogoAtualModal[1].time,
        golsA: document.getElementById("mScoreA").textContent,
        golsB: document.getElementById("mScoreB").textContent
    };

    console.log("Resultado:", resultado);

    alert(`Resultado: ${resultado.timeA} ${resultado.golsA} x ${resultado.golsB} ${resultado.timeB}`);

    fecharModal();
}
