function salvarCampeonato4() {
    const dadosMataMata = JSON.parse(localStorage.getItem("times4"));
    
    if (!dadosMataMata) {
        alert("Erro: Dados do torneio de 4 times não encontrados!");
        return Promise.reject("Sem dados"); 
    }

    const nomeTorneio = dadosMataMata.nome;

    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
    }

    const formData = new FormData();
    formData.append('nome_torneio', nomeTorneio);
    formData.append('dados_json', JSON.stringify(backup));

    // O "return" aqui é fundamental para o próximo passo
    return fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "sucesso") {
            console.log("Progresso do Mata-mata salvo!");
            return data; // Repassa o sucesso
        } else {
            throw new Error(data.mensagem);
        }
    })
    .catch(err => {
        console.error("Erro ao salvar:", err);
        alert("Erro ao salvar no servidor: " + err);
    });
}