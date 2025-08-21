let etapaAtual = 1;
const totalEtapas = 3;

const btnProximo = document.getElementById("btnProximo");
const btnVoltar = document.getElementById("btnVoltar");
const btnFinalizar = document.getElementById("btnFinalizar");

// formata CPF
document.getElementById("cpf").addEventListener("input", function(e){
  let v = e.target.value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = v;
});

// formata telefone
document.getElementById("telefone").addEventListener("input", function(e){
  let v = e.target.value.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = v;
});

// formata CEP
function formatarCep(input) {
  input.value = input.value.replace(/\D/g, '')
                           .replace(/(\d{5})(\d)/, '$1-$2')
                           .slice(0, 9);
}

// busca CEP
function buscarCep() {
  const cep = document.getElementById('cep').value.trim().replace('-', '');
  if (cep.length < 8) {
    alert('Digite um CEP válido!');
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(data => {
      if (data.erro) throw new Error('CEP não encontrado.');

      document.getElementById('rua').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('cidade').value = data.localidade;
      document.getElementById('uf').value = data.uf;
    })
    .catch(err => alert(err.message));
}

// toggle senha
function toggleSenha(idInput, elIcon) {
  const input = document.getElementById(idInput);
  if (input.type === "password") {
    input.type = "text";
    elIcon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    input.type = "password";
    elIcon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

// mudar etapas
function mostrarEtapa(num) {
  for (let i = 1; i <= totalEtapas; i++) {
    document.getElementById(`etapa${i}`).style.display = (i === num) ? "block" : "none";
  }
  btnVoltar.style.display = (num > 1) ? "inline-block" : "none";
  btnProximo.style.display = (num < totalEtapas) ? "inline-block" : "none";
  btnFinalizar.style.display = (num === totalEtapas) ? "block" : "none";
}

// valida etapa atual
function validarEtapa() {
  const inputs = document.querySelectorAll(`#etapa${etapaAtual} input[required]`);
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Preencha todos os campos obrigatórios!");
      return false;
    }
  }
  if (etapaAtual === 3) {
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;
    if (senha !== confirmar) {
      alert("As senhas não conferem!");
      return false;
    }
  }
  return true;
}

btnProximo.addEventListener("click", () => {
  if (validarEtapa()) {
    etapaAtual++;
    mostrarEtapa(etapaAtual);
  }
});

btnVoltar.addEventListener("click", () => {
  etapaAtual--;
  mostrarEtapa(etapaAtual);
});

// submissão final
document.getElementById("formCadastro").addEventListener("submit", function(e) {
  if (!validarEtapa()) e.preventDefault();
  else alert("Cadastro realizado com sucesso!");
});

mostrarEtapa(etapaAtual);



