document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.sidebar button');
    const pages = document.querySelectorAll('.page');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
  
        // Ocultar todas as páginas
        pages.forEach(page => {
          page.classList.add('hidden');
        });
  
        // Exibir a página selecionada
        document.getElementById(target).classList.remove('hidden');
      });
    });
  });
  