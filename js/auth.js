/* Função LOGIN */
function entrar() {
    let u = document.getElementById("user").value.trim();
    let p = document.getElementById("pass").value.trim();

    if (u === "" || p === "") {
        alert("Preencha todos os campos!");
        return;
    }

    window.location.href = "home.html"; 
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
    window.location.href = "login.html";
}