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