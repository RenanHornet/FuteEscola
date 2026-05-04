<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking Final - Torneio</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navbar com semântica de navegação -->
    <nav class="navbar" style="display:flex" aria-label="Navegação principal">
        <a href="home.php">Home</a>
        <a href="campeonato.php">Novo Campeonato</a>
        <a href="chaveamento.php">Chaveamento Simples</a>
        <a href="semifinal6.php">Semifinal Grupos</a>
        <a href="ranking.php" aria-current="page">Ranking</a>
        <a href="index.html" onclick="logout(event)">Sair</a>
    </nav>

    <main id="ranking" class="screen container">
        <header>
            <h1>🏆 Ranking Geral</h1>
        </header>

        <!-- Seção do Pódio/Times -->
        <section aria-labelledby="titulo-times">
            <h2 id="titulo-times">Classificação Final</h2>
            <table id="tabelaRanking">
                <thead>
                    <tr>
                        <th scope="col">Posição</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- O JS preenche com 1º, 2º, 3º e 4º lugares -->
                </tbody>
            </table>
        </section>

        <hr>

        <!-- Seção de Artilharia -->
        <section aria-labelledby="titulo-artilharia">
            <h2 id="titulo-artilharia">⚽ Top 3 Artilheiros</h2>
            <div id="topArtilheiros" class="artilharia-grid">
                <!-- JS vai preencher aqui -->
            </div>
        </section>
    </main>

    <script src="js/ranking.js"></script>
</body>
</html>