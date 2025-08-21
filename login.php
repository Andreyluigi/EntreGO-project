<?php
$login = $_POST['login'];
$senha = $_POST['senha'];

// Login e senha pra acessar sem banco de dados
$loginMestre = "admin";
$senhaMestre = "123456";

// Se for o login mestre, já aprova e nem consulta o banco
if ($login === $loginMestre && $senha === $senhaMestre) {
    echo "Login bem-sucedido";
    exit; 
}

$conn = new mysqli("localhost", "root", "", "login");
if ($conn->connect_error) {
die("Erro de conexão: " . $conn->connect_error);
}
$sql = "SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha'";
$resultado = $conn->query($sql);
if ($resultado->num_rows > 0) {
echo trim("Login bem-sucedido");

} else {
echo "Usuário ou senha incorretos.";
}
$conn->close();
?>