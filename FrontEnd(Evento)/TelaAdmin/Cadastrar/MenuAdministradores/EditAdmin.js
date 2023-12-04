const apiURL = 'http://localhost:3001/usuarios';

const selectAdmin = document.getElementById('editar-admin');
const nomeAdmin = document.getElementById('NomeAdmin');
const emailAdmin = document.getElementById('EmailAdmin');
const senhaAdmin = document.getElementById('SenhaAdmin'); // Adicione esta linha se você tiver um campo de senha no seu formulário
const telefoneAdmin = document.getElementById('TelefoneAdmin');
const cpfAdmin = document.getElementById('CpfAdmin');
const generoAdmin = document.getElementById('GeneroAdmin');
const enderecoAdmin = document.getElementById('EnderecoAdmin');
const tipoAdmin = document.getElementById('TipoAdmin');
const situacaoAdmin = document.getElementById('SituacaoAdmin');

async function preencherAdmins() {
  const response = await fetch(apiURL);
  const usuarios = await response.json();

  usuarios.forEach(usuario => {
    if (usuario.tipo == 'admin') {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.text = usuario.nome;
      selectAdmin.appendChild(option);
    }
  });
}

async function preencherFormulario() {
  const adminId = selectAdmin.value;
  const response = await fetch(`${apiURL}/${adminId}`);
  const data = await response.json();
  console.log(data); 

  const admin = data[0]; 

  nomeAdmin.value = admin.nome;
  emailAdmin.value = admin.email;
  senhaAdmin.value = admin.senha; // Adicione esta linha se você tiver um campo de senha no seu formulário
  telefoneAdmin.value = admin.telefone;
  cpfAdmin.value = admin.cpf;
  generoAdmin.value = admin.genero;
  enderecoAdmin.value = admin.endereco;
  tipoAdmin.value = admin.tipo;
  situacaoAdmin.value = admin.situacao;
}

async function editarAdmin(event) {
  event.preventDefault(); 

  const adminId = selectAdmin.value;
  const adminInfo = {
    nome: nomeAdmin.value,
    email: emailAdmin.value,
    senha: senhaAdmin.value, // Adicione esta linha se você tiver um campo de senha no seu formulário
    telefone: telefoneAdmin.value,
    cpf: cpfAdmin.value,
    genero: generoAdmin.value,
    endereco: enderecoAdmin.value,
    tipo: tipoAdmin.value,
    situacao: situacaoAdmin.value,
  };

  const response = await fetch(`${apiURL}/${adminId}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(adminInfo)
  });

  if (response.ok) {
    alert('Informações do administrador atualizadas com sucesso!');
  } else {
    alert('Erro ao atualizar as informações do administrador.');
  }
}

document.getElementById('formulario').addEventListener('submit', editarAdmin);
selectAdmin.addEventListener('change', preencherFormulario);
window.addEventListener('load', preencherAdmins);
