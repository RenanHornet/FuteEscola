//Apenas estrutura inicial (pode ser ajudada depois para a sessão PHP)
document.addEventListener('DOMContentLoaded', () => {
console.log("Home carregada");
});

//logout agora conectado ao PHP
function logout(e){
e.preventDefault();

```
fetch("php/logout.php")
.then(() => {
    window.location.href = "index.html";
});
```

}
