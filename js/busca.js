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
// Lista fake (depois puxa do banco)
let lugares = [
  { nome: "pizzaria saborosa", tipo: "pizza", img: "pizza.jpg" },
  { nome: "mercado bom preco", tipo: "mercado", img: "mercado.jpg" },
  { nome: "hamburgueria top", tipo: "lanche", img: "hamburguer.jpg" },
  { nome: "padaria delicia", tipo: "padaria", img: "padaria.jpg" }
]

let campobusca = document.getElementById("campobusca")
let listacards = document.getElementById("listacards")

function mostrarlugares(lista) {
  listacards.innerHTML = ""
  if (lista.length == 0) {
    listacards.innerHTML = "<p>nada encontrado</p>"
    return
  }
  lista.forEach(lugar => {
    let card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
      <img src="${lugar.img}" alt="${lugar.nome}">
      <div class="cardinfo">
        <h3>${lugar.nome}</h3>
        <p>${lugar.tipo}</p>
      </div>
    `
    listacards.appendChild(card)
  })
}

// Mostrar tudo no início
mostrarlugares(lugares)

// Filtrar enquanto digita
campobusca.addEventListener("input", () => {
  let texto = campobusca.value.toLowerCase()
  let filtrado = lugares.filter(lugar =>
    lugar.nome.toLowerCase().includes(texto) ||
    lugar.tipo.toLowerCase().includes(texto)
  )
  mostrarlugares(filtrado)
})