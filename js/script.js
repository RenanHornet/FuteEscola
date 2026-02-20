
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

    showScreen("home"); // ✅ navbar aparece automaticamente
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
    const times = JSON.parse(localStorage.getItem("times4"));

    if(!times || times.length < 4){
        alert("Nenhum time encontrado!");
        return;
    }

    const chavesDiv = document.getElementById("chaves");
    chavesDiv.innerHTML = ""; // limpa antes

    // semifinais
    const semi1 = `${times[0].time} vs ${times[1].time}`;
    const semi2 = `${times[2].time} vs ${times[3].time}`;

    chavesDiv.innerHTML = `
        <div class="match-box">${semi1}</div>
        <div class="match-box">${semi2}</div>
        <div class="match-box">Final</div>
    `;
}
