document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let nome = document.getElementById('NomeAdmin').value;
    let email = document.getElementById('EmailAdmin').value;
    let senha = document.getElementById('SenhaAdmin').value;
    let confirmSenha = document.getElementById('SenhaAdminConfirm').value;
    let telefone = document.getElementById('TelefoneAdmin').value;
    let cpf = document.getElementById('CpfAdmin').value;
    let endereco = document.getElementById('EnderecoAdmin').value;
    let situacao = document.getElementById('SituacaoAdmin').value;

    if (senha !== confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
  
    let data = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      cpf: cpf,
      endereco: endereco,
      situacao: situacao
    };
  
    fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  });