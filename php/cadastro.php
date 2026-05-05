<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - FutEscola</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <main id="cadastro" class="screen">
        <header>
            <div class="logologin">
                <img src="/FutEscola/images/Logo_do_TCC-P2.png">
            </div>
            <h1 style="text-align: center;">Cadastre-se</h1>
        </header>

        <form id="formCadastro">
            <input name="usuario" type="text" placeholder="Usuário" required aria-label="Nome de usuário">

            <input name="email" type="email" placeholder="Email" required aria-label="E-mail">

            <input name="senha" type="password" placeholder="Senha" required aria-label="Senha">

            <div class="container-botoes" style="display: flex; flex-direction: column; align-items: center;">
                <button type="submit" class="btn">CADASTRAR</button>
                <div id="erroCadastro" style="color:red; margin-top:10px; text-align: center;"></div>
            </div>
        </form>

        <footer>
            <p style="text-align:center; margin-top:15px;">
                <a href="/index.html">Já tem conta? Entrar</a>
            </p>
        </footer>

    </main>

    <script src="/js/auth.js"></script>
</body>
</html>