<?php
header('Content-Type: application/json');
include("conexao.php");
session_start();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Sessão expirada."]);
    exit;
}

$id_usuario = $_SESSION['usuario_id'];

// CORREÇÃO: Agora selecionamos também a coluna tipo_torneio
$sql = "SELECT id_save, nome_torneio, tipo_torneio, data_save FROM saves_campeonatos WHERE id_usuario = '$id_usuario' ORDER BY data_save DESC";
$resultado = $conn->query($sql);

$torneios = [];
while ($linha = $resultado->fetch_assoc()) {
    $torneios[] = $linha;
}

echo json_encode(["status" => "sucesso", "torneios" => $torneios]);
$conn->close();
?>