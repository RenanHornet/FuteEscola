
<?php
#garante o acesso.
session_start();

if(!isset($_SESSION['usuario_id'])){
    header("Location: ../index.html");
    exit();
}

?>