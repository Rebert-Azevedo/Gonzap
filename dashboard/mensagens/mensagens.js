document.addEventListener('DOMContentLoaded', () => {
    const messageModal = document.getElementById('message-modal');
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');
    const btnAddMessage = document.getElementById('btn-add-message');
    const btnCancel = document.getElementById('btn-cancel');
    const modalTitle = document.getElementById('modal-title');
    const messageName = document.getElementById('message-name');
    const messageContent = document.getElementById('message-content');

    let editIndex = null;

    // Abrir modal para adicionar nova mensagem
    btnAddMessage.addEventListener('click', () => {
        modalTitle.textContent = 'Adicionar Mensagem';
        messageForm.reset();
        messageModal.style.display = 'flex';
        editIndex = null;
    });

    // Cancelar e fechar o modal
    btnCancel.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });

    // Salvar nova mensagem ou editar existente
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = messageName.value.trim();
        const content = messageContent.value.trim();

        if (!name || !content) {
            // Mostrar mensagens de erro
            document.getElementById('name-error').style.display = name ? 'none' : 'block';
            document.getElementById('message-error').style.display = content ? 'none' : 'block';
            return;
        }

        if (editIndex === null) {
            // Adicionar nova mensagem
            addMessage(name, content);
        } else {
            // Editar mensagem existente
            updateMessage(editIndex, name, content);
        }

        messageModal.style.display = 'none';
    });

    // Função para adicionar mensagem na lista
    function addMessage(name, content) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${name}</td>
            <td>${content}</td>
            <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </td>
        `;

        // Adicionar eventos para os botões Editar e Excluir
        row.querySelector('.btn-edit').addEventListener('click', () => editMessage(row.rowIndex - 1));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteMessage(row.rowIndex - 1));

        messageList.appendChild(row);
    }

    // Função para editar mensagem
    function editMessage(index) {
        const row = messageList.rows[index];
        const name = row.cells[0].textContent;
        const content = row.cells[1].textContent;

        messageName.value = name;
        messageContent.value = content;
        modalTitle.textContent = 'Editar Mensagem';
        messageModal.style.display = 'flex';
        editIndex = index;
    }

    // Função para atualizar mensagem
    function updateMessage(index, name, content) {
        const row = messageList.rows[index];

        row.cells[0].textContent = name;
        row.cells[1].textContent = content;
    }

    // Função para excluir mensagem
    function deleteMessage(index) {
        messageList.deleteRow(index);
    }
});
