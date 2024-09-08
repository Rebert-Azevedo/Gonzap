document.addEventListener('DOMContentLoaded', () => {
    const documentModal = document.getElementById('document-modal');
    const documentForm = document.getElementById('document-form');
    const documentList = document.getElementById('document-list');
    const btnAddDocument = document.getElementById('btn-add-document');
    const btnCancel = document.getElementById('btn-cancel');
    const modalTitle = document.getElementById('modal-title');
    const documentName = document.getElementById('document-name');
    const documentFile = document.getElementById('document-file');

    let editIndex = null;

    // Abrir modal para adicionar novo documento
    btnAddDocument.addEventListener('click', () => {
        modalTitle.textContent = 'Adicionar Documento';
        documentForm.reset();
        documentModal.style.display = 'flex';
        editIndex = null;
    });

    // Cancelar e fechar o modal
    btnCancel.addEventListener('click', () => {
        documentModal.style.display = 'none';
    });

    // Salvar novo documento ou editar existente
    documentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = documentName.value.trim();
        const file = documentFile.files[0];

        if (!name || !file) {
            // Mostrar mensagens de erro
            document.getElementById('name-error').style.display = name ? 'none' : 'block';
            document.getElementById('file-error').style.display = file ? 'none' : 'block';
            return;
        }

        if (editIndex === null) {
            // Adicionar novo documento
            addDocument(name, file);
        } else {
            // Editar documento existente
            updateDocument(editIndex, name, file);
        }

        documentModal.style.display = 'none';
    });

    // Função para adicionar documento na lista
    function addDocument(name, file) {
        const row = document.createElement('tr');
        const documentUrl = URL.createObjectURL(file); // Criar URL temporária para o documento

        row.innerHTML = `
            <td>${name}</td>
            <td>
                <a href="${documentUrl}" download="${file.name}">Baixar ${file.name}</a>
            </td>
            <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </td>
        `;

        // Adicionar eventos para os botões Editar e Excluir
        row.querySelector('.btn-edit').addEventListener('click', () => editDocument(row.rowIndex - 1));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteDocument(row.rowIndex - 1));

        documentList.appendChild(row);
    }

    // Função para editar documento
    function editDocument(index) {
        const row = documentList.rows[index];
        const name = row.cells[0].textContent;

        documentName.value = name;
        modalTitle.textContent = 'Editar Documento';
        documentModal.style.display = 'flex';
        editIndex = index;
    }

    // Função para atualizar documento
    function updateDocument(index, name, file) {
        const row = documentList.rows[index];
        const documentUrl = URL.createObjectURL(file); // Criar nova URL para o novo arquivo

        row.cells[0].textContent = name;
        row.cells[1].innerHTML = `
            <a href="${documentUrl}" download="${file.name}">Baixar ${file.name}</a>
        `;
    }

    // Função para excluir documento
    function deleteDocument(index) {
        documentList.deleteRow(index);
    }
});
