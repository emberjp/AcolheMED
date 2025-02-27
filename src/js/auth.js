// src/js/auth.js

// Função para verificar se o usuário está logado e tem permissão para acessar a página
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // Se não houver usuário logado, redireciona para a página de login
        window.location.href = 'login.html';
        return;
    }
    
    // Mapeamento de cargos para páginas permitidas
    const accessRules = {
        'doctor': 'doctor.html',
        'nurse': 'nurse.html',
        'receptionist': 'receptionist.html'
    };

    // Obtém a página atual
    const currentPage = window.location.pathname.split('/').pop();
    
    // Verifica se o usuário tem permissão para acessar a página
    if (accessRules[user.role] !== currentPage && !(user.role=='nurse' && currentPage=='patientData.html')) {
        alert('Acesso negado! Você não tem permissão para esta página.');
        window.location.href = 'login.html';
    }
}

// Chamar a verificação de login e permissão ao carregar as páginas protegidas
checkAuth();