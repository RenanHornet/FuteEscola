<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

// 1. Verifica sessão
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Sessão expirada. Faça login novamente."
    ]);
    exit;
}

// 2. Verifica se é POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "erro", "mensagem" => "Método inválido."]);
    exit;
}

$id_usuario = $_SESSION['usuario_id'];

// 3. Captura e valida os dados do formulário
$nome_torneio = isset($_POST['nome_torneio']) ? trim($_POST['nome_torneio']) : '';
$dados_json   = isset($_POST['dados_json']) ? $_POST['dados_json'] : '';
$tipo_torneio = isset($_POST['tipo_torneio']) ? (int)$_POST['tipo_torneio'] : 0;

// Validação de segurança: Não permite salvar sem o tipo definido (4 ou 6)
if ($tipo_torneio !== 4 && $tipo_torneio !== 6) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Tipo de torneio inválido ou não enviado (Recebido: $tipo_torneio)."
    ]);
    exit;
}

if (empty($nome_torneio) || empty($dados_json)) {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos."]);
    exit;
}

/* 4. Lógica de Gravação (UPSERT)
   Usamos Prepared Statements para evitar erros com caracteres especiais no JSON
*/
$sql = "INSERT INTO saves_campeonatos (id_usuario, nome_torneio, tipo_torneio, dados_json) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
            tipo_torneio = VALUES(tipo_torneio), 
            dados_json = VALUES(dados_json), 
            data_save = CURRENT_TIMESTAMP";

try {
    $stmt = $conn->prepare($sql);
    // "isis" -> id_usuario (int), nome (string), tipo (int), json (string)
    $stmt->bind_param("isis", $id_usuario, $nome_torneio, $tipo_torneio, $dados_json);

    if ($stmt->execute()) {
        // Se foi um INSERT novo, pegamos o ID gerado. 
        // Se foi UPDATE, o id_save continua o mesmo.
        $id_final = ($stmt->insert_id > 0) ? $stmt->insert_id : null;

        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Campeonato '$nome_torneio' salvo como tipo $tipo_torneio!",
            "id_save" => $id_final 
        ]);
    } else {
        throw new Exception($stmt->error);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro no banco de dados: " . $e->getMessage()
    ]);
}

$conn->close();
?>