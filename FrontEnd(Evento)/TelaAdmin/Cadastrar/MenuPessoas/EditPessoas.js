const apiURL = 'http://localhost:3001/usuarios';

const selectPessoa = document.getElementById('editar-Pessoa');
const nomePessoa = document.getElementById('NomePessoa');
const emailPessoa = document.getElementById('EmailPessoa');
const senhaPessoa = document.getElementById('SenhaPessoa'); // Adicione esta linha se você tiver um campo de senha no seu formulário
const telefonePessoa = document.getElementById('TelefonePessoa');
const cpfPessoa = document.getElementById('CpfPessoa');
const generoPessoa = document.getElementById('GeneroPessoa');
const enderecoPessoa = document.getElementById('EnderecoPessoa');
const tipoPessoa = document.getElementById('TipoPessoa');
const situacaoPessoa = document.getElementById('SituacaoPessoa');

async function preencherpessoa() {
  const response = await fetch(apiURL);
  const usuarios = await response.json();

  usuarios.forEach(usuario => {
    if (usuario.tipo == 'pessoa') {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.text = usuario.nome;
      selectPessoa.appendChild(option);
    }
  });
}

async function preencherFormulario() {
  const pessoaId = selectPessoa.value;
  const response = await fetch(`${apiURL}/${pessoaId}`);
  const data = await response.json();
  console.log(data); 

  const pessoa = data[0]; 

  nomePessoa.value = pessoa.nome;
  emailPessoa.value = pessoa.email;
  senhaPessoa.value = pessoa.senha; // Adicione esta linha se você tiver um campo de senha no seu formulário
  telefonePessoa.value = pessoa.telefone;
  cpfPessoa.value = pessoa.cpf;
  generoPessoa.value = pessoa.genero;
  enderecoPessoa.value = pessoa.endereco;
  tipoPessoa.value = pessoa.tipo;
  situacaoPessoa.value = pessoa.situacao;
}

async function editarPessoa(event) {
  event.preventDefault(); 

  const pessoaId = selectPessoa.value;
  const pessoaInfo = {
    nome: nomePessoa.value,
    email: emailPessoa.value,
    senha: senhaPessoa.value,
    telefone: telefonePessoa.value,
    cpf: cpfPessoa.value,
    genero: generoPessoa.value,
    endereco: enderecoPessoa.value,
    tipo: tipoPessoa.value,
    situacao: situacaoPessoa.value,
  };

  const response = await fetch(`${apiURL}/${pessoaId}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pessoaInfo)
  });

  if (response.ok) {
    alert('Informações de pessoas atualizadas com sucesso!');
  } else {
    alert('Erro ao atualizar as informações do pessoas.');
  }
}

document.getElementById('formulario').addEventListener('submit', editarPessoa);
selectPessoa.addEventListener('change', preencherFormulario);
window.addEventListener('load', preencherpessoa);
