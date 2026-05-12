<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Sessão expirada."]);
    exit;
}

// Agora recebemos o ID do save específico via GET
if (!isset($_GET['id_save'])) {
    echo json_encode(["status" => "erro", "mensagem" => "ID do campeonato não fornecido."]);
    exit;
}

$id_save = $conn->real_escape_string($_GET['id_save']);
$id_usuario = $_SESSION['usuario_id'];

// Busca o save específico garantindo que pertence ao usuário logado
$sql = "SELECT dados_json FROM saves_campeonatos WHERE id_save = '$id_save' AND id_usuario = '$id_usuario'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $linha = $resultado->fetch_assoc();
    echo json_encode([
        "status" => "sucesso",
        "dados" => $linha['dados_json'] // Retorna o JSON completo do backup
    ]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Campeonato não encontrado."]);
}

$conn->close();
?>