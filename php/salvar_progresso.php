<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

// 1. Verifica se o utilizador está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Sessão expirada. Por favor, faça login novamente."
    ]);
    exit;
}

// 2. Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $id_usuario = $_SESSION['usuario_id'];
    
    // Captura o nome do torneio e o JSON enviados pelo save4.js ou times4.js
    // Usamos real_escape_string para proteger contra SQL Injection
    $nome_torneio = $conn->real_escape_string($_POST['nome_torneio']); 
    $dados_json   = $conn->real_escape_string($_POST['dados_json']);

    /* 3. Lógica de Gravação (UPSERT):
       Como removeu o UNIQUE apenas do id_usuario e criou o UNIQUE composto (id_usuario, nome_torneio),
       esta query agora irá:
       - Inserir um novo registo se o utilizador não tiver um torneio com esse nome.
       - Atualizar o progresso (JSON) se o utilizador já tiver um torneio salvo com esse nome.
    */
    $sql = "INSERT INTO saves_campeonatos (id_usuario, nome_torneio, dados_json) 
            VALUES ('$id_usuario', '$nome_torneio', '$dados_json')
            ON DUPLICATE KEY UPDATE 
                dados_json = VALUES(dados_json),
                data_save = CURRENT_TIMESTAMP";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Campeonato '$nome_torneio' guardado com sucesso!"
        ]);
    } else {
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Erro ao gravar no banco de dados: " . $conn->error
        ]);
    }

} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Método de requisição inválido."
    ]);
}

$conn->close();
?>