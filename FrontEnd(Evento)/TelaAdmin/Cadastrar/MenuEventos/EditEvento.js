
    const apiURL = 'http://localhost:3001/eventos';

    const selectEvento = document.getElementById('editar-evento');
    const nomeEvento = document.getElementById('NomeEvento');
    const enderecoEvento = document.getElementById('EnderecoEvento');
    const descricaoEvento = document.getElementById('DescricaoEvento');
    const dataInicioEvento = document.getElementById('DatadeInicio');
    const dataFimEvento = document.getElementById('DatadeFim');
    const precoEvento = document.getElementById('PrecoEvento');
    const situacaoEvento = document.getElementById('SituacaoEvento');

    async function preencherEvento() {
      const response = await fetch(apiURL);
      const eventos = await response.json();

      eventos.forEach(evento => {
        const option = document.createElement('option');
        option.value = evento.id;
        option.text = evento.nome;
        selectEvento.appendChild(option);
      });
    }

    async function preencherFormulario() {
      const eventoId = selectEvento.value;
      const response = await fetch(`${apiURL}/${eventoId}`);
      const data = await response.json();
      console.log(data); 

      const evento = data[0]; 

      nomeEvento.value = evento.nome;
      enderecoEvento.value = evento.endereco;
      descricaoEvento.value = evento.descricao;
      dataInicioEvento.value = evento.data_inicio;
      dataFimEvento.value = evento.data_termino;
      precoEvento.value = evento.preco;
      situacaoEvento.value = evento.situacao;
    }

    async function editarEvento(event) {
      event.preventDefault(); 

      const eventoId = selectEvento.value;
      const eventoInfo = {
        nome: nomeEvento.value,
        endereco: enderecoEvento.value,
        descricao: descricaoEvento.value,
        data_inicio: dataInicioEvento.value,
        data_termino: dataFimEvento.value,
        preco: precoEvento.value,
        situacao: situacaoEvento.value,
      };

      const response = await fetch(`${apiURL}/${eventoId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoInfo)
      });

      if (response.ok) {
        alert('Informações do evento atualizadas com sucesso!');
      } else {
        alert('Erro ao atualizar as informações do evento.');
      }
    }

    document.getElementById('formulario').addEventListener('submit', editarEvento);
    selectEvento.addEventListener('change', preencherFormulario);
    window.addEventListener('load', preencherEvento);