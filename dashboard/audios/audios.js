document.addEventListener('DOMContentLoaded', () => {
    const audioModal = document.getElementById('audio-modal');
    const audioForm = document.getElementById('audio-form');
    const audioList = document.getElementById('audio-list');
    const btnAddAudio = document.getElementById('btn-add-audio');
    const btnCancel = document.getElementById('btn-cancel');
    const modalTitle = document.getElementById('modal-title');
    const audioName = document.getElementById('audio-name');
    const audioFile = document.getElementById('audio-file');

    let editIndex = null;

    // Abrir modal para adicionar novo áudio
    btnAddAudio.addEventListener('click', () => {
        modalTitle.textContent = 'Adicionar Áudio';
        audioForm.reset();
        audioModal.style.display = 'flex';
        editIndex = null;
    });

    // Cancelar e fechar o modal
    btnCancel.addEventListener('click', () => {
        audioModal.style.display = 'none';
    });

    // Salvar novo áudio ou editar existente
    audioForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = audioName.value.trim();
        const file = audioFile.files[0];

        if (!name || !file) {
            // Mostrar mensagens de erro
            document.getElementById('name-error').style.display = name ? 'none' : 'block';
            document.getElementById('file-error').style.display = file ? 'none' : 'block';
            return;
        }

        if (editIndex === null) {
            // Adicionar novo áudio
            addAudio(name, file);
        } else {
            // Editar áudio existente
            updateAudio(editIndex, name, file);
        }

        audioModal.style.display = 'none';
    });

    // Função para adicionar áudio na lista
    function addAudio(name, file) {
        const row = document.createElement('tr');
        const audioUrl = URL.createObjectURL(file); // Criar URL temporária para o áudio

        row.innerHTML = `
            <td>${name}</td>
            <td>
                <audio controls>
                    <source src="${audioUrl}" type="${file.type}">
                    Seu navegador não suporta o elemento de áudio.
                </audio>
            </td>
            <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </td>
        `;

        // Adicionar eventos para os botões Editar e Excluir
        row.querySelector('.btn-edit').addEventListener('click', () => editAudio(row.rowIndex - 1));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteAudio(row.rowIndex - 1));

        audioList.appendChild(row);
    }

    // Função para editar áudio
    function editAudio(index) {
        const row = audioList.rows[index];
        const name = row.cells[0].textContent;
        // Aqui não podemos recuperar o arquivo de áudio original, então vamos apenas permitir a edição do nome

        audioName.value = name;
        modalTitle.textContent = 'Editar Áudio';
        audioModal.style.display = 'flex';
        editIndex = index;
    }

    // Função para atualizar áudio
    function updateAudio(index, name, file) {
        const row = audioList.rows[index];
        const audioUrl = URL.createObjectURL(file); // Criar nova URL para o novo arquivo de áudio

        row.cells[0].textContent = name;
        row.cells[1].innerHTML = `
            <audio controls>
                <source src="${audioUrl}" type="${file.type}">
                Seu navegador não suporta o elemento de áudio.
            </audio>
        `;
    }

    // Função para excluir áudio
    function deleteAudio(index) {
        audioList.deleteRow(index);
    }
});
