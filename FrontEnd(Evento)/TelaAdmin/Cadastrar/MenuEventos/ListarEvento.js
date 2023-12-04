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
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
          if (confirm('Tem certeza de que deseja excluir este evento?')) {
            deleteUser(user.id);
          }
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        table.appendChild(row);
      });
    })
    .catch(error => console.error('Erro:', error));

  // Adicione este código para exportar para CSV
  document.querySelector('.csv').addEventListener('click', function() {
      let data = [];
      const rows = document.querySelectorAll('.table-listarevento tr');
      for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].querySelectorAll('td');
          let rowData = [];
          for (let j = 0; j < cells.length; j++) {
              rowData.push(cells[j].textContent);
          }
          data.push(rowData.join(','));
      }
      let csvContent = data.join('\n');
      let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "eventos.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });

  document.querySelector('.pdf').addEventListener('click', function() {
    let doc = new jsPDF();
    let data = [];
    const rows = document.querySelectorAll('.table-listarevento tr');
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        let rowData = [];
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }
        data.push(rowData);
    }
    doc.autoTable({
        head: [['Nome', 'Endereço', 'Descrição', 'Data de Início', 'Data de Término', 'Preço', 'Situação']],
        body: data
    });
    doc.save('eventos.pdf');
});


};

function deleteUser(userId) {
fetch(`http://localhost:3001/eventos/${userId}`, {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Erro ao excluir usuário: ${response.statusText}`);
  }
  location.reload();
})
.catch(error => console.error('Erro:', error));
}
