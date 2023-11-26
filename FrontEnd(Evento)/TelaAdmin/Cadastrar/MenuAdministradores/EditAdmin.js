const apiURL = 'http://localhost:3000/usuarios';

// Obter elementos do DOM
const selectAdmin = document.getElementById('editar-admin');
const nomeAdmin = document.getElementById('NomeAdmin');
const emailAdmin = document.getElementById('EmailAdmin');
const senhaAdmin = document.getElementById('SenhaAdmin');
const senhaAdminConfirm = document.getElementById('SenhaAdminConfirm');
const telefoneAdmin = document.getElementById('TelefoneAdmin');
const cpfAdmin = document.getElementById('CpfAdmin');
const enderecoAdmin = document.getElementById('EnderecoAdmin');
const situacaoAdmin = document.getElementById('SituacaoAdmin');

// Função para preencher o select com os nomes dos administradores
async function preencherAdmins() {
  const response = await fetch(apiURL);
  const admins = await response.json();

  admins.forEach(admin => {
    const option = document.createElement('option');
    option.value = admin.id;
    option.text = admin.nome;
    selectAdmin.appendChild(option);
  });
}

// Função para preencher o formulário com as informações do administrador selecionado
async function preencherFormulario() {
  const adminId = selectAdmin.value;
  console.log(adminId)
  const response = await fetch(`${apiURL}/${adminId}`);
  const admin = await response.json();
  console.log(admin)

  nomeAdmin.value = admin.nome;
  emailAdmin.value = admin.email;
  senhaAdmin.value = admin.senha;
  senhaAdminConfirm.value = admin.senha;
  telefoneAdmin.value = admin.telefone;
  cpfAdmin.value = admin.cpf;
  enderecoAdmin.value = admin.endereco;
  situacaoAdmin.value = admin.situacao;
}

// Evento para preencher o formulário quando um administrador é selecionado
selectAdmin.addEventListener('change', preencherFormulario);

// Preencher o select com os nomes dos administradores ao carregar a página
window.addEventListener('load', preencherAdmins);