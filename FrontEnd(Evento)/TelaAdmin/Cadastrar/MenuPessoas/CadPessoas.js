document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("NomePessoas").value;
    let email = document.getElementById("EmailPessoas").value;
    let senha = document.getElementById("SenhaPessoas").value;
    let confirmSenha = document.getElementById("SenhaPessoasConfirm").value;
    let telefone = document.getElementById("TelefonePessoas").value;
    let cpf = document.getElementById("CpfPessoas").value;
    let genero = document.getElementById("GeneroPessoas").value;
    let endereco = document.getElementById("EnderecoPessoas").value;
    let tipo = document.getElementById("TipoPessoas").value;
    let situacao = document.getElementById("SituacaoPessoas").value;

    if (senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (cpf.length < 11) {
      alert("O CPF deve ter 11 números!");
      return;
    }

    let data = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      cpf: cpf,
      genero: genero,
      endereco: endereco,
      tipo: tipo,
      situacao: situacao,
    };

    fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sucesso:", data);
        document.getElementById("formulario").reset();
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
