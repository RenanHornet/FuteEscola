<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Partida - FutEscola</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav class="navbar" style="display:flex">
            <a href="home.php">Home</a>
            <a href="chaveamento.php">Chaveamento</a>
            <a href="ranking.php">Ranking</a>
            <a href="index.html">Sair</a>
        </nav>
    </header>

    <!-- O Chaveamento ao fundo -->
    <main id="chaveamento" class="screen" style="display:block">
        <header>
            <h1>Chaveamento do Torneio</h1>
            <p style="text-align: center; color: var(--primary);">Fase Final</p>
        </header>

        <section class="grid" id="chaves" aria-live="polite">
            <!-- Conteúdo dinâmico das chaves -->
        </section>

        <footer class="container-botoes">
            <button class="btn" onclick="finalizarTorneio()">
                Finalizar Torneio
            </button>
        </footer>
    </main>

    <!-- Modal de registro de partida (O componente principal desta página) -->
    <section id="modalPartida" class="modal" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
        <div class="modal-content">
            <header>
                <h2 id="modalTitle">Registrar Partida</h2>
            </header>
            
            <!-- Placar Central -->
            <article class="score">
                <div class="time-box">
                    <h3>Time A</h3>
                    <div class="time" id="mTimeA">Time A</div>
                </div>

                <div class="placar" aria-label="Placar atual">
                    <span id="mScoreA">0</span>
                    <span class="vs">X</span>
                    <span id="mScoreB">0</span>
                </div>

                <div class="time-box">
                    <h3>Time B</h3>
                    <div class="time" id="mTimeB">Time B</div>
                </div>
            </article>

            <div class="container-escalacao">
                <section class="lista-time">
                    <h3>Jogadores - Time A</h3>
                    <div id="jogadoresA" class="lista-jogadores">
                        <!-- O JS deve injetar aqui os jogadores com botões de + e - gols -->
                    </div>
                </section>

                <section class="lista-time">
                    <h3>Jogadores - Time B</h3>
                    <div id="jogadoresB" class="lista-jogadores">
                        <!-- O JS deve injetar aqui os jogadores com botões de + e - gols -->
                    </div>
                </section>
            </div>

            <footer class="container-botoes">
                <button class="btn" onclick="finalizarPartida()">Finalizar</button>
                <button class="btn btn-orange" onclick="fecharModal()">Fechar</button>
            </footer>
        </div>
    </section>

    <script src="js/semifinal6.js"></script> 
</body>
</html>