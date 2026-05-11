function salvarCampeonato4() {
    // 1. Pega os dados que o times4.js acabou de gerar
    const dadosMataMata = JSON.parse(localStorage.getItem("times4"));
    
    if (!dadosMataMata) {
        alert("Erro: Dados do torneio de 4 times não encontrados!");
        return;
    }

    // 2. O nome que você criou no times4.php
    const nomeTorneio = dadosMataMata.nome;

    // 3. Prepara o "pacote" completo (incluindo artilharia e chaves se já houver)
    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
    }

    const formData = new FormData();
    formData.append('nome_torneio', nomeTorneio);
    formData.append('dados_json', JSON.stringify(backup));

    // 4. Envia para o seu salvar_progresso.php
    fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "sucesso") {
            console.log("Progresso do Mata-mata salvo!");
        }
    })
    .catch(err => console.error("Erro ao salvar:", err));
}