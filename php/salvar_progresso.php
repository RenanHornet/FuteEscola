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

// NOVO: Captura o id_save enviado pelo JS (se houver) para sabermos se é uma atualização
$id_save      = isset($_POST['id_save']) ? (int)$_POST['id_save'] : 0;

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

try {
    // CORREÇÃO: Se já temos um id_save válido, atualizamos diretamente aquele registro
    if ($id_save > 0) {
        $sql = "UPDATE saves_campeonatos 
                SET dados_json = ?, data_save = CURRENT_TIMESTAMP 
                WHERE id_save = ? AND id_usuario = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sii", $dados_json, $id_save, $id_usuario);
        
        if ($stmt->execute()) {
            echo json_encode([
                "status" => "sucesso",
                "mensagem" => "Progresso do campeonato atualizado com sucesso!",
                "id_save" => $id_save // Retorna o mesmo ID
            ]);
        } else {
            throw new Exception($stmt->error);
        }
    } else {
        // Se NÃO temos id_save, significa que é um campeonato novo sendo criado (INSERT)
        $sql = "INSERT INTO saves_campeonatos (id_usuario, nome_torneio, tipo_torneio, dados_json) 
                VALUES (?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isis", $id_usuario, $nome_torneio, $tipo_torneio, $dados_json);

        if ($stmt->execute()) {
            // Captura o ID que o banco acabou de gerar para este campeonato inédito
            $id_gerado = $stmt->insert_id;

            echo json_encode([
                "status" => "sucesso",
                "mensagem" => "Campeonato '$nome_torneio' criado com sucesso!",
                "id_save" => $id_gerado // Envia o ID novo de volta para o JS colocar na URL
            ]);
        } else {
            throw new Exception($stmt->error);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro no banco de dados: " . $e->getMessage()
    ]);
}

if (isset($stmt)) {
    $stmt->close();
}
$conn->close();
?>