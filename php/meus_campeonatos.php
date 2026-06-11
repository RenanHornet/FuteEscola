<?php
include("conexao.php");
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$id_usuario = $_SESSION['usuario_id'];

$sql = "SELECT id_save, nome_torneio, tipo_torneio, data_save FROM saves_campeonatos WHERE id_usuario = '$id_usuario' ORDER BY data_save DESC";
$resultado = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Torneios - FutEscola</title>
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

    <main class="screen active">
        <header>
            <h1>Meus Campeonatos</h1>
        </header>

        <section class="container-campeonatos">
            <?php if ($resultado->num_rows > 0): ?>
                <?php while($row = $resultado->fetch_assoc()): ?>
                    
                    <div class="card-time">
                        <h2><?php echo $row['nome_torneio']; ?></h2>
                        <p>Data: <?php echo date('d/m/Y H:i', strtotime($row['data_save'])); ?></p>
                        
                        <?php
                            if ((int)$row['tipo_torneio'] === 6) {
                                $linkDestino = "chaveamento6.php";
                                $tipoLabel = "6 Times (Grupos)";
                                $corBadge = "#28a745";
                            } else {
                                $linkDestino = "chaveamento.php";
                                $tipoLabel = "4 Times (Mata-mata)";
                                $corBadge = "#007bff";
                            }
                        ?>

                        <div style="margin-bottom: 15px;">
                            <small style="background: <?php echo $corBadge; ?>; color: white; padding: 3px 10px; border-radius: 5px; font-weight: bold;">
                                <?php echo $tipoLabel; ?>
                            </small>
                        </div>
                        
                        <a href="<?php echo $linkDestino; ?>?id=<?php echo $row['id_save']; ?>" class="btn-abrir" style="text-decoration: none; display: inline-block;">
                            Gerir Torneio
                        </a>
                        <hr>
                    </div>

                <?php endwhile; ?>
            <?php else: ?>
                <p style="color: white; text-align: center;">Ainda não tem campeonatos guardados.</p>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>