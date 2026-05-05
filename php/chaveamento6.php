<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chaveamento 6 Times - FutEscola</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    
    <header>
        <nav class="navbar" style="display:flex">
            <a href="home.php">Home</a>
            <a href="campeonato.php">Novo Campeonato</a>
            <a href="semifinal6.php">Semifinal Grupos</a>
            <a href="ranking.php">Ranking</a>
            <a href="../index.html" onclick="logout(event)">Sair</a>
        </nav>
    </header>
    
    <main class="screen active" style="max-width: 1000px">
        <header>
            <h1>Fase de Grupos</h1>
        </header>

        <div class="container-competicao">
            <aside class="coluna-ranking">
                <section class="card-time">
                    <h3>Grupo A</h3>
                    <table class="tabela-mini" id="tabela-A">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Pontos</th>
                                <th>Saldo de gols</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </section>

                <section class="card-time">
                    <h3>Grupo B</h3>
                    <table class="tabela-mini" id="tabela-B">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Pontos</th>
                                <th>Saldo de gols</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>    
                </section>    
            </aside>

            <section class="coluna-jogos">
                <header>
                    <h3>Confrontos</h3>
                </header>
                <div id="lista-jogos" aria-live="polite">
                    <!-- JS preenche aqui -->
                </div>
            </section>
        </div>

        <footer class="container-botoes">
            <button class="btn" onclick="concluirFaseDeGrupos()">Finalizar fase</button>
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
                <button class="btn" onclick="fecharModal()">Fechar</button>
            </footer>
        </div>
    </section>    

    <script src="../js/chaveamento6.js"></script>
</body>
</html>