document.addEventListener("DOMContentLoaded", function () {
    const disconnectBtn = document.querySelector(".Butfoot:nth-child(1)");
    const endAppointmentBtn = document.querySelector(".Butfoot:nth-child(2)");
    const startAppointmentBtn = document.getElementById("ButDados");
    const nextPatientBtn = document.querySelector(".Butfoot:nth-child(3)");
    const cancelAppointmentBtn = document.getElementById("ButPro");
    
    // Evento para desconectar
    disconnectBtn.addEventListener("click", function () {
        if (confirm("Deseja realmente sair?")) {
            window.location.href = "login.html"; // Redireciona para login
        }
    });

    // Evento para terminar consulta
    endAppointmentBtn.addEventListener("click", function () {
        alert("Consulta finalizada com sucesso!");
        
    });

    // Evento para próximo paciente
    nextPatientBtn.addEventListener("click", function () {
        alert("Chamando próximo paciente...");
        cleanPatientData();
    });

    cancelAppointmentBtn.addEventListener("click", function() {
        if (confirm("Deseja cancelar a consulta?")) {
            cleanPatientData();
        }
    });

    startAppointmentBtn.addEventListener("click", function() {
        loadPatientData();
    });
});

function 