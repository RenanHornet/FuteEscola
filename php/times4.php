<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Cadastro de times - Mata-mata</title>
</head>
<body>
    <!-- Como esta página não tem a navbar no seu código original, 
         vamos direto para o conteúdo principal -->
    <main id="times4" class="screen" style="display: block;">
        
        <header>
            <h1>Cadastro de times (4 times - Mata-mata)</h1>
        </header>

        <form id="formTimes4">
            <!-- Time 1 -->
            <!-- O fieldset agrupa os inputs de cada time semânticamente -->
            <fieldset class="card-time">
                <legend><h2>Time 1</h2></legend>
                
                <input class="nomes-times" type="text" placeholder="Nome do time" required aria-label="Nome do Time 1">
                <hr>
                
                <!-- Inputs de jogadores com aria-label para acessibilidade -->
                <input type="text" placeholder="Nome do jogador 1" aria-label="Jogador 1 do Time 1">
                <input type="text" placeholder="Nome do jogador 2" aria-label="Jogador 2 do Time 1">
                <input type="text" placeholder="Nome do jogador 3" aria-label="Jogador 3 do Time 1">
                <input type="text" placeholder="Nome do jogador 4" aria-label="Jogador 4 do Time 1">
                <input type="text" placeholder="Nome do jogador 5" aria-label="Jogador 5 do Time 1">
                <input type="text" placeholder="Nome do jogador 6" aria-label="Jogador 6 do Time 1">
                <input type="text" placeholder="Nome do jogador 7" aria-label="Jogador 7 do Time 1">
                <input type="text" placeholder="Nome do jogador 8" aria-label="Jogador 8 do Time 1">
            </fieldset>

            <!-- Time 2 -->
            <fieldset class="card-time">
                <legend><h2>Time 2</h2></legend>
                <input class="nomes-times" type="text" placeholder="Nome do time" required aria-label="Nome do Time 2">
                <hr>
                <input type="text" placeholder="Nome do jogador 1" aria-label="Jogador 1 do Time 2">
                <input type="text" placeholder="Nome do jogador 2" aria-label="Jogador 2 do Time 2">
                <input type="text" placeholder="Nome do jogador 3" aria-label="Jogador 3 do Time 2">
                <input type="text" placeholder="Nome do jogador 4" aria-label="Jogador 4 do Time 2">
                <input type="text" placeholder="Nome do jogador 5" aria-label="Jogador 5 do Time 2">
                <input type="text" placeholder="Nome do jogador 6" aria-label="Jogador 6 do Time 2">
                <input type="text" placeholder="Nome do jogador 7" aria-label="Jogador 7 do Time 2">
                <input type="text" placeholder="Nome do jogador 8" aria-label="Jogador 8 do Time 2">
            </fieldset>

            <!-- Time 3 -->
            <fieldset class="card-time">
                <legend><h2>Time 3</h2></legend>
                <input class="nomes-times" type="text" placeholder="Nome do time" required aria-label="Nome do Time 3">
                <hr>
                <input type="text" placeholder="Nome do jogador 1" aria-label="Jogador 1 do Time 3">
                <input type="text" placeholder="Nome do jogador 2" aria-label="Jogador 2 do Time 3">
                <input type="text" placeholder="Nome do jogador 3" aria-label="Jogador 3 do Time 3">
                <input type="text" placeholder="Nome do jogador 4" aria-label="Jogador 4 do Time 3">
                <input type="text" placeholder="Nome do jogador 5" aria-label="Jogador 5 do Time 3">
                <input type="text" placeholder="Nome do jogador 6" aria-label="Jogador 6 do Time 3">
                <input type="text" placeholder="Nome do jogador 7" aria-label="Jogador 7 do Time 3">
                <input type="text" placeholder="Nome do jogador 8" aria-label="Jogador 8 do Time 3">
            </fieldset>

            <!-- Time 4 -->
            <fieldset class="card-time">
                <legend><h2>Time 4</h2></legend>
                <input class="nomes-times" type="text" placeholder="Nome do time" required aria-label="Nome do Time 4">
                <hr>
                <input type="text" placeholder="Nome do jogador 1" aria-label="Jogador 1 do Time 4">
                <input type="text" placeholder="Nome do jogador 2" aria-label="Jogador 2 do Time 4">
                <input type="text" placeholder="Nome do jogador 3" aria-label="Jogador 3 do Time 4">
                <input type="text" placeholder="Nome do jogador 4" aria-label="Jogador 4 do Time 4">
                <input type="text" placeholder="Nome do jogador 5" aria-label="Jogador 5 do Time 4">
                <input type="text" placeholder="Nome do jogador 6" aria-label="Jogador 6 do Time 4">
                <input type="text" placeholder="Nome do jogador 7" aria-label="Jogador 7 do Time 4">
                <input type="text" placeholder="Nome do jogador 8" aria-label="Jogador 8 do Time 4">
            </fieldset>

            <footer class="container-botoes">
                <button type="submit" class="btn">
                    Salvar e gerar chaveamento
                </button>
            </footer>
        </form>
    </main>
    
    <script src="../js/times4.js"></script>    
</body>
</html>