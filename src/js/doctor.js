document.addEventListener("DOMContentLoaded", function () {
    const disconnectBtn = document.querySelector(".Butfoot:nth-child(1)");
    const endAppointmentBtn = document.querySelector(".Butfoot:nth-child(2)");
    const startAppointmentBtn = document.getElementById("ButDados");
    const nextPatientBtn = document.querySelector(".Butfoot:nth-child(3)");
    const cancelAppointmentBtn = document.getElementById("ButPro");
    
    // Evento para desconectar
    disconnectBtn.addEventListener("click", function () {
        if (confirm("Deseja realmente sair?")) {
            window.location.href = "login.html"; 
        }
    });

    // Evento para terminar consulta
    endAppointmentBtn.addEventListener("click", function () {
        alert("Consulta finalizada com sucesso!");
        
    });

    // Evento para próximo paciente
    nextPatientBtn.addEventListener("click", function () {
        alert("Chamando próximo paciente...");
        //cleanPatientData();
        preencherDados();
    });

    cancelAppointmentBtn.addEventListener("click", function() {
        if (confirm("Deseja cancelar a consulta?")) {
            cleanPatientData();
        }
    });

    startAppointmentBtn.addEventListener("click", function() {
        
    });
});

function preencherDados() {
    document.getElementById("Queixa").textContent = "Dor de cabeça ideswdfwantensa"; 
    document.getElementById("Obsrvações").textContent = "Paciente relatou início há 3 dias";
    document.getElementById("Medicamento").innerHTML = "Paracetamol 750mg";

    document.getElementById("Alergia").textContent = "Nenhuma conhecida";
    document.getElementById("Dor").textContent = "7";

    document.getElementById("Temp").textContent = "37.5°C";
    document.getElementById("Arterial").textContent = "120/80";
    document.getElementById("Cardiaca").textContent = "75 bpm";
    document.getElementById("Respiratória").textContent = "18 rpm";
    document.getElementById("Peso").textContent = "70 kg";

    document.getElementById("especificidade").textContent = "Exemplo";
    document.getElementById("Es1").textContent = "100";
    document.getElementById("Es2").textContent = "200";
    document.getElementById("Es3").textContent = "300";
    document.getElementById("Es4").textContent = "400";
}
