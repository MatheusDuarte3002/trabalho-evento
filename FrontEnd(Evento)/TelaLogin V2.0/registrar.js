// document
//   .getElementById("formLogin")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     let nome = document.querySelector("nome").value;
//     let email = document.querySelector("email").value;
//     let senha = document.querySelectorAll("senha").value;
//     let confirmSenha = document.querySelectorAll("confirmsenha");
//     let telefone = document.querySelector("telefone").value;
//     let cpf = document.querySelector("cpf").value;
//     let genero = document.getElementById("genero").value;
//     let tipo = document.getElementById("tipo").value || "pessoa";
//     let endereco = document.querySelectorAll("endereco").value;

//     if (senha !== confirmSenha) {
//       alert("As senhas não coincidem!");
//       return;
//     }

//     if (cpf.length < 11) {
//       alert("O CPF deve ter 11 números!");
//       return;
//     }

//     let data = {
//       nome: nome,
//       email: email,
//       senha: senha,
//       telefone: telefone,
//       cpf: cpf,
//       genero: genero,
//       tipo: tipo,
//       endereco: endereco,
//     };

//     fetch("http://localhost:3001/usuarios", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Sucesso:", data);
//         document.getElementById("formLogin").reset();
//         alert("Usuário criado com sucesso!");
//       })
//       .catch((error) => {
//         console.error("Erro:", error);
//       });
//   });

document
  .getElementById("formLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;
    let confirmSenha = document.querySelector("#confirmsenha").value;
    let telefone = document.querySelector("#telefone").value;
    let cpf = document.querySelector("#cpf").value;
    let genero = document.getElementById("#genero").value;
    let endereco = document.querySelector("#endereco").value;

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
        document.getElementById("formLogin").reset();
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
