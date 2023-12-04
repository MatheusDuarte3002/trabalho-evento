document
  .getElementById("formLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let payload = {
      email: email,
      senha: senha,
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("Unknown error");
        }
      })
      .then((dados) => {
        console.log(dados);
        if (dados.nome === "suarez") {
          location.href = "../Site Evento/Visualizar/home.html";
        } else if (dados.nome === "matheus") {
          location.href = "../TelaAdmin/Cadastrar/home.html";
        } else {
          alert("Tipo de usuário desconhecido!");
        }
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          alert("Usuário não autorizado!");
        } else {
          alert("Ops! Algo deu errado!");
        }
      });
  });
