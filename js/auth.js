console.log("Auth carregado");

document.addEventListener("DOMContentLoaded", function () {

/* -------- CADASTRO -------- */

const formCadastro = document.querySelector("#formCadastro");

if (formCadastro) {

formCadastro.addEventListener("submit", function(e) {

e.preventDefault();

const formData = new FormData(formCadastro);

fetch("php/cadastrar.php", {
method: "POST",
body: formData
})
.then(response => response.json())
.then(data => {

if (data.status === "erro") {

document.getElementById("erroCadastro").innerText = data.mensagem;

}

if (data.status === "sucesso") {

window.location.href = "index.html";

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
