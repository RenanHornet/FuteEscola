<?php

header('Content-Type: application/json');

include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST['usuario'];
    $email   = $_POST['email'];
    $senha   = $_POST['senha'];

    // Verifica se email já existe
    $verifica = "SELECT * FROM Cadastros WHERE Email = '$email'";
    $resultado = $conn->query($verifica);

    if ($resultado->num_rows > 0) {

        echo json_encode([
            "status" => "erro",
            "mensagem" => "Usuário ou email já cadastrado!"
        ]);
        exit;

    }

    // Criptografar senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Cadastros (Usuario, Email, Senha)
            VALUES ('$usuario', '$email', '$senhaHash')";

    if ($conn->query($sql) === TRUE) {

        echo json_encode([
            "status" => "sucesso"
        ]);

    } else {

        echo json_encode([
            "status" => "erro",
            "mensagem" => "Erro ao cadastrar"
        ]);

    }

}

$conn->close();
?>
