// API VIACEP

function limpa_formulário_cep() {
  document.getElementById("logradouro").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("cep").value = "";
}

// Preencher os dados
function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    document.getElementById("logradouro").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("cep").value = conteudo.cep;
  } else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

// Função para realizar a busca do CEP
function pesquisacep(valor) {
  var cep = valor.replace(/\D/g, "");
  if (cep !== "") {
    var validacep = /^[0-9]{8}$/;
    if (validacep.test(cep)) {
      document.getElementById("logradouro").value = "...";
      document.getElementById("bairro").value = "...";
      document.getElementById("cidade").value = "...";
      document.getElementById("cep").value = "...";
      var script = document.createElement("script");
      script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
      document.body.appendChild(script);
    } else {
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    limpa_formulário_cep();
  }
}

// Evento para o botão "Buscar"
const eventClick = document.getElementById("buscar");
eventClick.addEventListener("click", () => {
  const cep = document.getElementById("inputCep").value;
  pesquisacep(cep);
});

// Evento para limpar o conteudo do formulário
const limparClick = document.getElementById("limpar");
limparClick.addEventListener("click", () => {
  limpa_formulário_cep();
  document.getElementById("inputCep").value = "";
});
