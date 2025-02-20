document.addEventListener("DOMContentLoaded", function () {
    const desconectarBtn = document.querySelector(".Butfoot:nth-child(1)");
    const terminarConsultaBtn = document.querySelector(".Butfoot:nth-child(2)");
    const proximoPacienteBtn = document.querySelector(".Butfoot:nth-child(3)");

    // Evento para desconectar
    desconectarBtn.addEventListener("click", function () {
        if (confirm("Deseja realmente sair?")) {
            window.location.href = "login.html"; // Redireciona para login
        }
    });

    // Evento para terminar consulta
    terminarConsultaBtn.addEventListener("click", function () {
        alert("Consulta finalizada com sucesso!");
    });

    // Evento para próximo paciente
    proximoPacienteBtn.addEventListener("click", function () {
        alert("Chamando próximo paciente...");
    });
});
