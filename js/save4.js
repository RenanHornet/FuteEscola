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
    formData.append('tipo_torneio', 4);
    formData.append('dados_json', JSON.stringify(backup));

    // O "return" aqui é fundamental para o próximo passo
    return fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    // ... dentro do fetch no save4.js ...
    .then(data => {
        if (data.status === "sucesso") {
            // Este alerta aparecerá sempre que a função for chamada
            alert("✅ Progresso salvo com sucesso!"); 
            return data; 
        } else {
            alert("❌ Erro ao salvar: " + data.mensagem);
            throw new Error(data.mensagem);
        }
    })
    .catch(err => {
        console.error("Erro:", err);
        alert("⚠️ Falha na conexão com o servidor.");
    });
}

function executarSalvamentoManual() {
    salvarCampeonato4().then(data => {
        if (data && data.status === "sucesso") {
            // O alert aqui confirma para o usuário que o clique funcionou
            alert("Torneio '" + (JSON.parse(localStorage.getItem("times4")).nome) + "' atualizado no banco de dados!");
        }
    });
}