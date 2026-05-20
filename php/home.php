
<?php require("auth.php"); #auth é a autenticação do usuário?>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - FutEscola</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="home.php">Home</a>
            <a href="campeonato.php">Novo Campeonato</a>
            <a href="meus_campeonatos.php">Campeonatos Salvos</a>
            <a href="chaveamento.php">Chaveamento Simples</a>
            <a href="semifinal6.php">Semifinal Grupos</a>
            <a href="ranking.php">Ranking</a>
            <a href="index.html" onclick="logout(event)">Sair</a>
        </nav>
    </header>

    <main id="home" class="screen">
        <header>
            <h1>FutEscola</h1>
            <div class="logologin">
                <img src="../images/Logo_do_TCC-P2.png" alt="Logo do site">
            </div>
        </header>

        <article>
            <p class="frase">
                    Bem-vindo, 
                    <strong><?php echo $_SESSION['usuario_nome']; ?></strong>
            </p>
            <p class="frase">
                <strong>Uma proposta mais moderna para seu interclasse!</strong>
            </p>
           
        </article>
    </main>

    <script src="../js/home.js"></script>
</body>
</html>