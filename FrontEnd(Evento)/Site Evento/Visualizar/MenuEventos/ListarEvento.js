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
        row.appendChild(enderecoCell)
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
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Desfazer';
        deleteButton.addEventListener('click', function() {
          if (confirm('Tem certeza de que deseja desfazer o check-in deste evento?')) {
            row.style.display = 'none';  
          }
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        table.appendChild(row);
      });
    })
    .catch(error => console.error('Erro:', error));
};
