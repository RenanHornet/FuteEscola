function salvarCampeonato6() {
    const dadosTorneio = JSON.parse(localStorage.getItem("torneioAtual"));
    
    if (!dadosTorneio) {
        return Promise.reject("Sem dados do torneio de 6 times");
    }

    // Prepara o backup completo do localStorage (incluindo artilharia)
    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
    }

    // Captura o ID da URL atual para enviar ao PHP
    const urlParams = new URLSearchParams(window.location.search);
    const idSave = urlParams.get('id');

    const formData = new FormData();
    formData.append('nome_torneio', dadosTorneio.nome);
    formData.append('tipo_torneio', 6);
    formData.append('dados_json', JSON.stringify(backup));
    
    // Se já existia um ID na URL, enviamos ele para o banco fazer o UPDATE no lugar certo
    if (idSave) {
        formData.append('id_save', idSave);
    }

    return fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json());
}