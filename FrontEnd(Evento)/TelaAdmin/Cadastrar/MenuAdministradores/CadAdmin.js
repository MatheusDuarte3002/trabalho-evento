document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("NomeAdmin").value;
    let email = document.getElementById("EmailAdmin").value;
    let senha = document.getElementById("SenhaAdmin").value;
    let confirmSenha = document.getElementById("SenhaAdminConfirm").value;
    let telefone = document.getElementById("TelefoneAdmin").value;
    let cpf = document.getElementById("CpfAdmin").value;
    let genero = document.getElementById("GeneroAdmin").value;
    let endereco = document.getElementById("EnderecoAdmin").value;
    let tipo = document.getElementById("TipoAdmin").value;
    let situacao = document.getElementById("SituacaoAdmin").value;

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
