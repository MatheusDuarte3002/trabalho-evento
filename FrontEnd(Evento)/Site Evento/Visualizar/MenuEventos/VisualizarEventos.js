window.onload = function() {
  fetch('http://localhost:3001/eventos')
    .then(response => response.json())
    .then(data => {
      const table = document.querySelector('.table-listarevento');
      data.forEach(user => {
        const row = document.createElement('tr');
        
        const nomeCell = document.createElement('td');
        nomeCell.textContent = user.nome;
        row.appendChild(nomeCell);
        
        const enderecoCell = document.createElement('td');
        enderecoCell.textContent = user.endereco;
        row.appendChild(enderecoCell);

        const descricaoCell = document.createElement('td');
        descricaoCell.textContent = user.descricao;
        row.appendChild(descricaoCell);
        
        const data_inicioCell = document.createElement('td');
        let dataInicio = new Date(user.data_inicio);
        data_inicioCell.textContent = dataInicio.toLocaleDateString('pt-BR');
        row.appendChild(data_inicioCell);
        
        const data_terminoCell = document.createElement('td');
        let dataTermino = new Date(user.data_termino);
        data_terminoCell.textContent = dataTermino.toLocaleDateString('pt-BR');
        row.appendChild(data_terminoCell);

        const precoCell = document.createElement('td');
        precoCell.textContent = user.preco;
        row.appendChild(precoCell);
      
        const situacaoCell = document.createElement('td');
        situacaoCell.textContent = user.situacao;
        row.appendChild(situacaoCell);

        const checkInCell = document.createElement('td');
        const checkInButton = document.createElement('button');
        checkInButton.textContent = 'Check-In';
        checkInButton.addEventListener('click', function() {
          checkInUser(user.id);
        });
        checkInCell.appendChild(checkInButton);
        row.appendChild(checkInCell);
        
        table.appendChild(row);
      });
    })
    .catch(error => console.error('Erro:', error));
};

function checkInUser(eventoId) {
  // Obtenha a data atual
  let currentDate = new Date();

  // Converta a data para o formato ISO
  let currentISODate = currentDate.toISOString();

  // Defina o id do usuário e o id do evento
  let userData = {
    usuarioId: 8,
    eventoId: eventoId,
    data_inscricao: currentISODate
  };

  // Faça uma solicitação POST para o servidor com os dados do usuário
  fetch('http://localhost:3001/inscricoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    // Verifique se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json();
    } else {
      console.log('A resposta não é JSON:', response);
    }
  })
  .then(data => {
    console.log('Sucesso:', data);
    alert('Check-in concluido'); 
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
}
