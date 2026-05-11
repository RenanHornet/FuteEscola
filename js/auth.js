console.log("Auth carregado");

document.addEventListener("DOMContentLoaded", function () {

/* -------- CADASTRO -------- */

const formCadastro = document.querySelector("#formCadastro");

if (formCadastro) {

const apiBase = window.location.pathname.includes("/php/") ? "../php/" : "php/";
const cadastrarUrl = apiBase + "cadastrar.php";
const loginPage = window.location.pathname.includes("/php/") ? "../index.html" : "index.html";

formCadastro.addEventListener("submit", function(e) {

    e.preventDefault();

    const formData = new FormData(formCadastro);

    fetch(cadastrarUrl, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === "erro") {
            document.getElementById("erroCadastro").innerText = data.mensagem || "Erro ao cadastrar.";
            return;
        }

        if (data.status === "sucesso") {
            window.location.href = loginPage;
        }

    })
    .catch(error => {
        document.getElementById("erroCadastro").innerText = "Erro ao conectar com o servidor.";
    });

});

}

/* -------- LOGIN -------- */

const formLogin = document.querySelector("#formLogin");

if (formLogin) {

formLogin.addEventListener("submit", function(e){

e.preventDefault();

const formData = new FormData(formLogin);

fetch("php/login.php", {
method: "POST",
body: formData
})
.then(response => response.json())
.then(data => {

if(data.status === "erro"){

document.getElementById("erroLogin").innerText = data.mensagem;

}

if(data.status === "sucesso"){

window.location.href = "php/home.php";

}

})
.catch(error => {

document.getElementById("erroLogin").innerText = "Erro ao conectar com o servidor.";

});

});

}

});

/*--------CARREGA O TORNEIO---------*/
function carregarCampeonatoDoBanco() {
    fetch("../php/carregar_progresso.php")
    .then(res => res.json())
    .then(data => {
        if (data.status === "sucesso") {
            // Transforma a string de volta em objeto
            const backup = JSON.parse(data.dados);
            
            // Limpa o navegador para não misturar dados
            localStorage.clear();
            
            // Restaura cada item (times, artilharia, resultados, etc)
            for (let chave in backup) {
                localStorage.setItem(chave, backup[chave]);
            }

            alert("Progresso recuperado com sucesso!");

            // Redirecionamento Inteligente
            if (localStorage.getItem("times4")) {
                window.location.href = "chaveamento.php";
            } else if (localStorage.getItem("torneioAtual")) {
                window.location.href = "chaveamento6.php";
            }
        } else {
            alert(data.mensagem);
        }
    })
    .catch(err => {
        console.error("Erro:", err);
        alert("Erro ao conectar com o servidor.");
    });
}
