<?php

session_start();
include("conexao.php");

if(!isset($_SESSION['usuario_id'])){
    echo json_encode(["status" => "erro", "mensagem" => "Não autorizado"]);
    exit();
}

$usuario_id = $_SESSION['usuario_id'];

for($t = 1; $t <= 4; $t++){

    // 🔥 CORRETO
    $nome_time = $_POST["time{$t}_nome"] ?? '';

    if(empty($nome_time)) continue;

    $sql = "INSERT INTO Times (Nome_Time, Usuario_ID) 
            VALUES ('$nome_time', '$usuario_id')";
    $conn->query($sql);

    $id_time = $conn->insert_id;

    for($j = 1; $j <= 8; $j++){

        // 🔥 CORRETO
        $nome_jogador = $_POST["time{$t}_jogador{$j}"] ?? '';

        if(!empty($nome_jogador)){
            $sql_jogador = "INSERT INTO Jogadores (Nome_Jogador, ID_Time)
                            VALUES ('$nome_jogador', '$id_time')";
            $conn->query($sql_jogador);
        }
    }
}

echo json_encode(["status" => "sucesso"]);

$conn->close();

?>