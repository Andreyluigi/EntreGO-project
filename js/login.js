const menu = document.getElementById('menu');
//menu do cabecalho 2
if (menu) {
  const itensMenu2 = [
    { nome: 'Início', link: 'index.html' },
    { nome: 'Busca', link: 'busca.html' },
    { nome: 'Meus Pedidos', link: 'pedidos.html' },
    { nome: 'Notificações', link: '#notificacoes' },
    { nome: 'Perfil', link: 'perfil.html' }
  ];

  const paginaatual = window.location.pathname.split('/').pop();
//pra ver qual a pagina q ta aberta
  itensMenu2.forEach(item => {
    const a = document.createElement('a');
    a.href = item.link;
    a.textContent = item.nome;
    menu.appendChild(a);

    if (item.link === paginaatual) {
      a.classList.add('ativo');
    }
    //pra deixar o item do cabecalho verdinho, de acordo se ele tiver na pagina 
  });
}
const forms = document.getElementById("form-login");

forms.addEventListener("submit", async function (e) {
  e.preventDefault();

  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const formData = new FormData();
  formData.append("login", login);
  formData.append("senha", senha);

  try {
    const resposta = await fetch("./login.php", {
      method: "POST",
      body: formData
    });

    const texto = (await resposta.text()).trim();
    const mensagem = document.getElementById("mensagem");

    if (texto.toLowerCase().includes("login bem-sucedido")) {
      mensagem.innerText = texto;
      mensagem.style.color = "green";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      mensagem.innerText = texto;
      mensagem.style.color = "red";
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    document.getElementById("mensagem").innerText = "Erro ao conectar com o servidor.";
  }
});