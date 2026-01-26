/* INICIO JAVASCRIPT */
/* ✅ Controle das telas */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    /* ✅ Sidebar só aparece fora do login/cadastro */
    if (id === "login" || id === "cadastro") {
        document.getElementById("navbar").style.display = "none";
    } else {
        document.getElementById("navbar").style.display = "flex";
    }
}

/* ✅ Função LOGIN */
function entrar() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "" || p === "") {
        alert("Preencha todos os campos!");
        return;
    }

    showScreen("home"); // ✅ navbar aparece automaticamente
}

/* ✅ Função CADASTRO */
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

/* ✅ Placar */
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

function salvarTimes4(){
    const times = [];

    document.querySelectorAll(".card-time").forEach((card, index) => {
        const inputs = card.querySelectorAll("input");

        const nomeTime = inputs[0].value;
        const jogadores = [];

        for(let i=1; i<inputs.length; i++){
            if(inputs[i].value !== ""){
                jogadores.push(inputs[i].value);
            }
        }

        times.push({
            time: nomeTime,
            jogadores: jogadores
        });
    });

    // salva no navegador
    localStorage.setItem("times4", JSON.stringify(times));

    // redireciona para chaveamento
    window.location.href = "chaveamento.html";
}

function gerarChaveamento() {
    const container = document.getElementById("chaves");
    container.innerHTML = "";

    const times = JSON.parse(localStorage.getItem("times4"));

    if (!times || times.length < 4) {
        alert("Cadastre 4 times primeiro!");
        return;
    }

    // Semifinais
    container.innerHTML += `
        <div class="match-box">
            ${times[0].time} <br> vs <br> ${times[1].time}
        </div>
    `;

    container.innerHTML += `
        <div class="match-box">
            ${times[2].time} <br> vs <br> ${times[3].time}
        </div>
    `;

    // Final (placeholder)
    container.innerHTML += `
        <div class="match-box">
            Final<br>
            Vencedor Jogo 1 vs Vencedor Jogo 2
        </div>
    `;
}
