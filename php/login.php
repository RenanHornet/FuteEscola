<?php

header('Content-Type: application/json');

session_start();

include("conexao.php");

$email = $_POST['email'];
$senha = $_POST['senha'];

$sql = "SELECT * FROM Cadastros WHERE Email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {

$usuario = $result->fetch_assoc();

if (password_verify($senha, $usuario['Senha'])) {

$_SESSION['usuario_id'] = $usuario['ID_Cadastro'];
$_SESSION['usuario_nome'] = $usuario['Usuario'];

echo json_encode([
"status" => "sucesso"
]);

} else {

echo json_encode([
"status" => "erro",
"mensagem" => "Senha incorreta"
]);

}

} else {

echo json_encode([
"status" => "erro",
"mensagem" => "Usuário não encontrado"
]);

}

$conn->close();

?>
