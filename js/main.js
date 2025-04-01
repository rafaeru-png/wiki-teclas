document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const mainNav = document.querySelector('.main-nav');

    menuBtn.addEventListener('click', () => {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });

    // Carregar Dados
    fetch('data/teclados.json')
        .then(response => response.json())
        .then(data => {
            // Implementar lógica de exibição
            console.log('Dados carregados:', data);
        });

    // Sistema de Busca
    const searchForm = document.querySelector('.search-box');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = e.target.querySelector('input').value;
        // Implementar lógica de busca
    });
});