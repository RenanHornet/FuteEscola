<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Campeonato - FutEscola</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
              <a href="home.php">Home</a>
            <a href="campeonato.php">Novo Campeonato</a>
            <a href="chaveamento.php">Chaveamento Simples</a>
            <a href="semifinal6.php">Semifinal Grupos</a>
            <a href="ranking.php">Ranking</a>
            <a href="index.html" onclick="logout(event)">Sair</a>
        </nav>
    </header>

    <main id="campeonato" class="screen active">
        <header>
            <h1>Novo Campeonato</h1>
        </header>

        <section class="formato">
            <article>
                <p class="frase"> 
                    <strong>Escolha o formato do campeonato:</strong>
                </p>
            </article>

            <div class="container-botoes">
                <button class="btn" onclick="selecionarFormato(4)">
                    Campeonato Simples (4 times)
                </button>
                <button class="btn" onclick="selecionarFormato(6)">
                    Por grupo (6 times)
                </button>
            </div>    
        </section>
    </main>

    <script src="js/campeonato.js"></script>
</body>
</html>