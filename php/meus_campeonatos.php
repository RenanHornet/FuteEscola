<?php
include("conexao.php");
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$id_usuario = $_SESSION['usuario_id'];
// Procura todos os torneios deste professor
$sql = "SELECT id_save, nome_torneio, data_save FROM saves_campeonatos WHERE id_usuario = '$id_usuario' ORDER BY data_save DESC";
$resultado = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meus Torneios</title>
    <link rel="stylesheet" href="../css/style.css">
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
    <main class="screen">
        <header>
            <h1>Meus Campeonatos</h1>
        </header>

        <section class="container-lista">
            <?php if ($resultado->num_rows > 0): ?>
                <?php while($row = $resultado->fetch_assoc()): ?>
                    <div class="card-torneio">
                        <h3><?php echo $row['nome_torneio']; ?></h3>
                        <p>Última atualização: <?php echo date('d/m/Y H:i', strtotime($row['data_save'])); ?></p>
                        <a href="chaveamento.php?id=<?php echo $row['id_save']; ?>" class="btn-abrir">Gerir Torneio</a>
                        <hr>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <p>Ainda não tem campeonatos guardados.</p>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>