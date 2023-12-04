window.onload = function() {
  fetch('http://localhost:3001/usuarios')
    .then(response => response.json())
    .then(data => {
      const table = document.querySelector('.table-listaradmin');
      data.forEach(user => {
        if (user.tipo === 'admin') {
          const row = document.createElement('tr');
          
          const nomeCell = document.createElement('td');
          nomeCell.textContent = user.nome;
          row.appendChild(nomeCell);
          
          const emailCell = document.createElement('td');
          emailCell.textContent = user.email;
          row.appendChild(emailCell);
          
          const telefoneCell = document.createElement('td');
          telefoneCell.textContent = user.telefone;
          row.appendChild(telefoneCell);
          
          const cpfCell = document.createElement('td');
          cpfCell.textContent = user.cpf;
          row.appendChild(cpfCell);
          
          const enderecoCell = document.createElement('td');
          enderecoCell.textContent = user.endereco;
          row.appendChild(enderecoCell);

          const tipoCell = document.createElement('td');
          tipoCell.textContent = user.tipo;
          row.appendChild(tipoCell);
          
          const situacaoCell = document.createElement('td');
          situacaoCell.textContent = user.situacao;
          row.appendChild(situacaoCell);

          const deleteCell = document.createElement('td');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Excluir';
          deleteButton.addEventListener('click', function() {
            if (confirm('Tem certeza de que deseja excluir este usuário?')) {
              deleteUser(user.id);
            }
          });
          deleteCell.appendChild(deleteButton);
          row.appendChild(deleteCell);
          
          table.appendChild(row);
        }
      });

      // Adicione este código para exportar para CSV
      document.querySelector('.csv').addEventListener('click', function() {
          let data = [];
          const rows = document.querySelectorAll('.table-listaradmin tr');
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
          link.setAttribute("download", "usuarios.csv");
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
    })
    .catch(error => console.error('Erro:', error));
};

function deleteUser(userId) {
fetch(`http://localhost:3000/usuarios/${userId}`, {
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
