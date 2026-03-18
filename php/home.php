<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../index.html");
    exit();
}
?>

<!DOCTYPE html>

<html lang="pt-BR">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Home - FutEscola</title>

<link rel="stylesheet" href="../css/style.css">

</head>

<body>

<div class="navbar">

<a href="home.php">Home</a>

<a href="../campeonato.php">Novo Campeonato</a>

<a href="../chaveamento.php">Chaveamento</a>

<a href="../ranking.php">Ranking</a>

<a href="logout.php">Sair</a>

</div>

<div id="home" class="screen">

<h1>FutEscola</h1>

<div class="logologin">
<img src="../images/Logo_do_TCC-P2.png" alt="Logo do site">
</div>

<p class="frase">
<strong>Uma proposta mais moderna para seu interclasse!</strong>
</p>

<p style="text-align:center;margin-top:20px;">
Bem-vindo,
<strong><?php echo $_SESSION['usuario_nome']; ?></strong>
</p>

</div>

</body>
</html>
