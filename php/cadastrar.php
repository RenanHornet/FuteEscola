<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include("conexao.php");

// Verifica se os dados foram enviados
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario = $_POST['usuario'];
    $email   = $_POST['email'];
    $senha   = $_POST['senha'];

    $sql = "INSERT INTO Cadastros (Usuario, Email, Senha)
            VALUES ('$usuario', '$email', '$senha')";

    if ($conn->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $conn->error;
    }

} else {
    echo "Acesso inválido.";
}

$conn->close();

?>