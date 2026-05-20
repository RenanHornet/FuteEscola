// Apenas estrutura inicial
document.addEventListener('DOMContentLoaded', () => {
    console.log("Home carregada");
});

/*unção para buscar o campeonato salvo no banco de dados*/
function carregarCampeonatoDoBanco() {
    // Faz a requisição ao arquivo PHP 
    fetch("../php/carregar_progresso.php")
    .then(res => res.json())
    .then(data => {
        if (data.status === "sucesso") {
            // O banco devolve uma string que é o backup do localStorage
            const backup = JSON.parse(data.dados);
            
            // Limpa o navegador para garantir que dados antigos não interfiram
            localStorage.clear();
            
            // Restaura item por item (times, gols, artilharia, nomes, etc)
            Object.keys(backup).forEach(chave => {
                localStorage.setItem(chave, backup[chave]);
            });

            alert("Campeonato recuperado com sucesso! Vamos lá.");

            // Redirecionamento Automático baseado no tipo de campeonato salvo
            if (localStorage.getItem("times4")) {
                window.location.href = "chaveamento.php";
            } else if (localStorage.getItem("torneioAtual")) {
                window.location.href = "chaveamento6.php";
            } else {
                // Caso algo dê errado na identificação, manda para a escolha de modo
                window.location.href = "campeonato.php";
            }
        } else {
            // Se o PHP retornar erro (ex: usuário não tem saves)
            alert(data.mensagem);
        }
    })
    .catch(err => {
        console.error("Erro ao carregar:", err);
        alert("Erro técnico ao conectar com o servidor.");
    });
}

// logout agora conectado ao PHP
function logout(e){
    e.preventDefault();
    if(confirm("Deseja realmente sair?")){
        window.location.href = "../php/logout.php"; // Certifique-se de ter esse arquivo para destruir a sessão
    }
}