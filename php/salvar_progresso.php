<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

// 1. Verifica se o usuário está logado para ter o ID da sessão
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
    
    // Captura o nome do torneio e JSON
       $nome_torneio = $conn->real_escape_string($_POST['nome_torneio']); // real_escape_string evita que aspas no JSON quebrem a query SQL
    $dados_json   = $conn->real_escape_string($_POST['dados_json']);

    /* 3.Save: 
       Ao inserir. Se o id_usuario já existir (devido ao UNIQUE no banco),
       ele apenas atualiza os dados e o nome do torneio.
    */
    $sql = "INSERT INTO saves_campeonatos (id_usuario, nome_torneio, dados_json) 
            VALUES ('$id_usuario', '$nome_torneio', '$dados_json')
            ON DUPLICATE KEY UPDATE 
                nome_torneio = VALUES(nome_torneio), 
                dados_json = VALUES(dados_json),
                data_save = CURRENT_TIMESTAMP";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Progresso salvo com sucesso na nuvem!"
        ]);
    } else {
        echo json_encode([
            "status" => "erro",
            "mensagem" => "Erro ao salvar no banco de dados: " . $conn->error
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