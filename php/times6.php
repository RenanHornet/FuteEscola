<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Times6 - Cadastro de Grupos</title>
</head>
<body>
    <main id="times6" class="screen" style="display: block;">
        <header>
            <h1>Cadastro de times (<span id="num-time">1</span>/6)</h1>
        </header>

        <section class="card-config">
            <label for="nome-campeonato">Nome do Campeonato:</label>
            <input class= "nomes-times"type="text" id="nome-campeonato" placeholder="Ex: Interclasse 2026 - 7º Ano" required aria-label="Nome do Campeonato">
        </section>
        
        <form id="formTimes6">
            <fieldset class="card-time" style="border: none; padding: 0; margin: 0;">
                <legend><h2 id="titulo-time">Time 1</h2></legend>
                
                <input id="nome-time" class="nomes-times" type="text" placeholder="Nome do time" required aria-label="Nome do time atual">
                <hr>

                <section id="container-jogadores">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 1" aria-label="Jogador 1">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 2" aria-label="Jogador 2">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 3" aria-label="Jogador 3">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 4" aria-label="Jogador 4">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 5" aria-label="Jogador 5">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 6" aria-label="Jogador 6">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 7" aria-label="Jogador 7">
                    <input type="text" class="jog-input" placeholder="Nome do jogador 8" aria-label="Jogador 8">
                </section>

                <footer class="container-botoes">
                    <button type="button" class="btn" id="btn-proximo" onclick="adicionarTime()">Salvar time</button>
                    
                    <button type="button" class="btn" id="btn-finalizar" onclick="finalizarCadastro()" 
                            style="display:none; background: var(--primary);">
                        Gerar Campeonato
                    </button>
                </footer>
            </fieldset>
        </form>
    </main>

    <script src="../js/save6.js"></script> 
    <script src="../js/times6.js"></script>          
</body>
</html>