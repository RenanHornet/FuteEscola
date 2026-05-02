<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semifinal - FutEscola</title>
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

    <main id="chaveamento" class="screen" style="display:block">
        <header>
            <h1>Chaveamento do Torneio</h1>
            <p style="text-align: center; color: var(--primary);">Fase Final</p>
        </header>

        <!-- Seção onde o JS vai renderizar as chaves da semifinal e final -->
        <section class="grid" id="chaves" aria-live="polite">
            <!-- Conteúdo dinâmico -->
        </section>

        <footer class="container-botoes">
            <button class="btn" onclick="finalizarTorneio()">
                Finalizar Torneio
            </button>
        </footer>
    </main>

    <!-- Modal de registro de partida -->
    <section id="modalPartida" class="modal" role="dialog" aria-labelledby="tituloModal" aria-modal="true">
        <div class="modal-content">
            <header>
                <h2 id="tituloModal">Registrar Partida</h2>
            </header>
            
            <article class="score">
                <div class="time-box">
                    <h3>Time A</h3>
                    <div class="time" id="mTimeA">Time A</div>
                </div>

                <div class="placar">
                    <span id="mScoreA">0</span>
                    <span class="vs">X</span>
                    <span id="mScoreB">0</span>
                </div>

                <div class="time-box">
                    <h3>Time B</h3>
                    <div class="time" id="mTimeB">Time B</div>
                </div>
            </article>

            <section class="controles-partida" aria-label="Controles de punição">
                <div style="text-align: center; margin-bottom: 15px;">
                    <button id="btn-modo-cartao" class="btn-toggle-card" onclick="alternarModoCartao()">
                        Modo Cartão: OFF
                    </button>
                </div>
            </section>
            <hr>
            <section>
                <h3>Jogadores - Time A</h3>
                <div id="jogadoresA" class="lista-jogadores"></div>
            </section>
            <hr>
            <section>
                <h3>Jogadores - Time B</h3>
                <div id="jogadoresB" class="lista-jogadores"></div>
            </section>

            <footer class="container-botoes">
                <button class="btn" onclick="finalizarPartida()">Finalizar</button>
                <button class="btn btn-orange" onclick="fecharModal()">Fechar</button>
            </footer>
        </div>
    </section>


    <script src="js/semifinal6.js"></script> 
</body>
</html>