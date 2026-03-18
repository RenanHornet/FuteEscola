<?php require 'php/auth.php'; ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chaveamento 6 Times</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
    
    <div class="navbar" style="display:flex">
        <a href="home.html">Home</a>
        <a href="chaveamento.html">Chaveamento</a>
        <a href="ranking.html">Ranking</a>
        <a href="index.html">Sair</a>
    </div>
    
        <!-- Conteúdo 6 times -->
    <div class="screen active" style="max-width: 1000px">
        <h1>Fase de Grupos</h1>
        <div class="container-competicao">
            <aside class="coluna-ranking">
                <div class="card-time">
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
                </div>

                <div class="card-time">
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
                </div>    
            </aside>

            <section class="coluna-jogos">
                <h3>Confrontos</h3>
                <div id="lista-jogos">

                </div>

            </section>

        </div>

        <div class="container-botoes">
        <button class="btn" onclick="concluirFaseDeGrupos()">finalizar fase</button>
        </div>
    </div>
    <!-- Modal de registro de partida -->
      
    <div id="modalPartida" class="modal">
        <div class="modal-content">
            <h2>Registrar Partida</h2>
            
            <div class="score">
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
            </div>

            <h3>Jogadores - Time A</h3>
            <div id="jogadoresA" class="lista-jogadores"></div>

            <h3>Jogadores - Time B</h3>
            <div id="jogadoresB" class="lista-jogadores"></div>
            
            <div class="container-botoes">
            <button class="btn" onclick="finalizarPartida()">Finalizar</button>
            <button class="btn" onclick="fecharModal()">Fechar</button>
            </div>
        </div>
    </div>    
<script src="js/chaveamento6.js"></script>
</body>
</html>