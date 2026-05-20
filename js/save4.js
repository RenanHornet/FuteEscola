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

    // Captura o ID diretamente da URL do navegador 
    const urlParams = new URLSearchParams(window.location.search);
    const idSave = urlParams.get('id');

    const formData = new FormData();
    formData.append('nome_torneio', nomeTorneio);
    formData.append('tipo_torneio', 4);
    formData.append('dados_json', JSON.stringify(backup));

    // Se o ID existir na URL, envia ele para o PHP saber que deve atualizar (UPDATE)
    if (idSave) {
        formData.append('id_save', idSave);
    }

    return fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "sucesso") {
            console.log("✅ Progresso salvo com sucesso!"); 
            
            // Se o campeonato acabou de ser criado e não tinha ID na URL, atualiza a barra de endereço
            if (!urlParams.has('id') && data.id_save) {
                window.location.search = `?id=${data.id_save}`;
            }
            
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
