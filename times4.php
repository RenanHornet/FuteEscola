<?php require(__DIR__ . "/php/auth.php"); ?>
<?php include(__DIR__ . "/php/header.php"); ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
<title>Cadastro de Times - Mata-mata</title>
</head>

<body>

<div id="times4" class="screen">
<h1>Cadastro de times (4 times - Mata-mata)</h1>

<form id="formTimes4">

<!-- ================= TIME 1 ================= -->
<div class="card-time">
<h2>Time 1</h2>

<input name="time1_nome" class="nomes-times" type="text" placeholder="Nome do time" required>

<hr>

<input name="time1_jogador1" type="text" placeholder="Jogador 1">
<input name="time1_jogador2" type="text" placeholder="Jogador 2">
<input name="time1_jogador3" type="text" placeholder="Jogador 3">
<input name="time1_jogador4" type="text" placeholder="Jogador 4">
<input name="time1_jogador5" type="text" placeholder="Jogador 5">
<input name="time1_jogador6" type="text" placeholder="Jogador 6">
<input name="time1_jogador7" type="text" placeholder="Jogador 7">
<input name="time1_jogador8" type="text" placeholder="Jogador 8">

</div>

<!-- ================= TIME 2 ================= -->
<div class="card-time">
<h2>Time 2</h2>

<input name="time2_nome" class="nomes-times" type="text" placeholder="Nome do time" required>

<hr>

<input name="time2_jogador1" type="text" placeholder="Jogador 1">
<input name="time2_jogador2" type="text" placeholder="Jogador 2">
<input name="time2_jogador3" type="text" placeholder="Jogador 3">
<input name="time2_jogador4" type="text" placeholder="Jogador 4">
<input name="time2_jogador5" type="text" placeholder="Jogador 5">
<input name="time2_jogador6" type="text" placeholder="Jogador 6">
<input name="time2_jogador7" type="text" placeholder="Jogador 7">
<input name="time2_jogador8" type="text" placeholder="Jogador 8">

</div>

<!-- ================= TIME 3 ================= -->
<div class="card-time">
<h2>Time 3</h2>

<input name="time3_nome" class="nomes-times" type="text" placeholder="Nome do time" required>

<hr>

<input name="time3_jogador1" type="text" placeholder="Jogador 1">
<input name="time3_jogador2" type="text" placeholder="Jogador 2">
<input name="time3_jogador3" type="text" placeholder="Jogador 3">
<input name="time3_jogador4" type="text" placeholder="Jogador 4">
<input name="time3_jogador5" type="text" placeholder="Jogador 5">
<input name="time3_jogador6" type="text" placeholder="Jogador 6">
<input name="time3_jogador7" type="text" placeholder="Jogador 7">
<input name="time3_jogador8" type="text" placeholder="Jogador 8">

</div>

<!-- ================= TIME 4 ================= -->
<div class="card-time">
<h2>Time 4</h2>

<input name="time4_nome" class="nomes-times" type="text" placeholder="Nome do time" required>

<hr>

<input name="time4_jogador1" type="text" placeholder="Jogador 1">
<input name="time4_jogador2" type="text" placeholder="Jogador 2">
<input name="time4_jogador3" type="text" placeholder="Jogador 3">
<input name="time4_jogador4" type="text" placeholder="Jogador 4">
<input name="time4_jogador5" type="text" placeholder="Jogador 5">
<input name="time4_jogador6" type="text" placeholder="Jogador 6">
<input name="time4_jogador7" type="text" placeholder="Jogador 7">
<input name="time4_jogador8" type="text" placeholder="Jogador 8">

</div>

<!-- BOTÃO -->
<div class="container-botoes">
<button type="submit" class="btn">
Salvar e gerar chaveamento
</button>
</div>

</form>
</div>

<script src="js/times4.js"></script>

</body>
</html>