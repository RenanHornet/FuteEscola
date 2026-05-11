<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Sessão expirada."]);
    exit;
}

$id_usuario = $_SESSION['usuario_id'];

// Busca o save único do usuário
$sql = "SELECT dados_json FROM saves_campeonatos WHERE id_usuario = '$id_usuario' LIMIT 1";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $linha = $resultado->fetch_assoc();
    // Retornamos os dados que estão em formato de string JSON
    echo json_encode([
        "status" => "sucesso",
        "dados" => $linha['dados_json']
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Nenhum campeonato salvo encontrado."
    ]);
}

$conn->close();
?>