document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("NomeEvento").value;
    let endereco = document.getElementById("EnderecoEvento").value;
    let descricao = document.getElementById("DescricaoEvento").value;
    let data_inicio = document.getElementById("DatadeInicio").value;
    let data_termino = document.getElementById("DatadeFim").value;
    let preco = document.getElementById("PrecoEvento").value;
    let situacao = document.getElementById("SituacaoEvento").value;

    let data = {
      nome: nome,
      endereco: endereco,
      descricao: descricao,
      data_inicio: data_inicio,
      data_termino: data_termino,
      preco: preco,
      situacao: situacao,
    };

    fetch("http://localhost:3001/eventos", {
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
        alert("Evento criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
