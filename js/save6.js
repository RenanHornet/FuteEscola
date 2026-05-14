function salvarCampeonato6() {
    const dadosTorneio = JSON.parse(localStorage.getItem("torneioAtual"));
    
    if (!dadosTorneio) {
        return Promise.reject("Sem dados do torneio de 6 times");
    }

    // Criamos o backup, mas garantimos que o tipo_torneio seja enviado como NÚMERO 6
    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        backup[key] = localStorage.getItem(key);
    }

    const formData = new FormData();
    formData.append('nome_torneio', dadosTorneio.nome);
    formData.append('tipo_torneio', 6); // <--- FORÇANDO O TIPO 6
    formData.append('dados_json', JSON.stringify(backup));

    return fetch("../php/salvar_progresso.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json());
}