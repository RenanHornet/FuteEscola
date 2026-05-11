<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chaveamento - FutEscola</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <nav class="navbar" style="display:flex">
            <a href="home.php">Home</a>
            <a href="campeonato.php">Novo Campeonato</a>
            <a href="ranking.php">Ranking</a>
            <a href="../index.html" onclick="logout(event)">Sair</a>
        </nav>
    </header>

    <main id="chaveamento" class="screen" style="display:block">
        <header>
            <h1>Chaveamento do Torneio</h1>
        </header>

        <section class="grid" id="chaves" aria-live="polite">
            <!-- O JS preenche o chaveamento aqui -->
        </section>
        <section>
            <div style="text-align: center; margin: 20px;">
                <button onclick="salvarCampeonato4()" class="btn" style="background-color: #007bff; color: white;">
                    💾 Salvar Resultados e Artilharia
                </button>
            </div>
        </section>

        <footer class="container-botoes">
            <button class="btn" onclick="finalizarTorneio()">
                Finalizar Torneio
            </button>
        </footer>
    </main>

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
            <section class="faltas-container">
                <span>Faltas Coletivas:</span>
                <div class="faltas-checks">
                    <input type="checkbox" aria-label="Falta 1">
                    <input type="checkbox" aria-label="Falta 2">
                    <input type="checkbox" aria-label="Falta 3">
                    <input type="checkbox" aria-label="Falta 4">
                    <input type="checkbox" class="check-perigo" aria-label="Falta 5 - Limite">
                </div>
            </section>
            <section>
                <h3>Jogadores - Time A</h3>
                <div id="jogadoresA" class="lista-jogadores"></div>
            </section>
            <hr>
            <section class="faltas-container">
                <span>Faltas Coletivas:</span>
                <div class="faltas-checks">
                    <input type="checkbox" aria-label="Falta 1">
                    <input type="checkbox" aria-label="Falta 2">
                    <input type="checkbox" aria-label="Falta 3">
                    <input type="checkbox" aria-label="Falta 4">
                    <input type="checkbox" class="check-perigo" aria-label="Falta 5 - Limite">
                </div>
            </section>
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
   
    <script src="../js/save4.js"></script>
    <script src="../js/chaveamento4.js"></script>    
</body>
</html>