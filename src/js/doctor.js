document.addEventListener("DOMContentLoaded", function () {
    const disconnectBtn = document.getElementById("Desconectar");
    const endAppointmentBtn = document.getElementById("Terminar");
    const startAppointmentBtn = document.getElementById("Iniciar");
    const nextPatientBtn = document.getElementById("Proximo");
    const cancelAppointmentBtn = document.getElementById("Cancelar");
    
    disconnectBtn.addEventListener("click", function () {
        if (confirm("Deseja realmente sair?")) {
            window.location.href = "login.html";
        }
    });

    endAppointmentBtn.addEventListener("click", function () {
        alert("Consulta finalizada com sucesso!");
        cleanPatientData();
        
    });

    nextPatientBtn.addEventListener("click", function () {
        alert("Chamando próximo paciente...");
        loadPatientData();
    });

    cancelAppointmentBtn.addEventListener("click", function() {
        if (confirm("Deseja cancelar a consulta?")) {
            cleanPatientData();
        }
    });

    startAppointmentBtn.addEventListener("click", function() {
        
    });
});


//the content for test
function loadPatientData() {
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

function cleanPatientData(){
    document.querySelectorAll(".show-info-box, .show-info-line").forEach(element => {
        element.innerHTML = ""; // Limpa o conteúdo das divs
    });
}