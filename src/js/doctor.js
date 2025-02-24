import Doctor from "../models/Doctor.js";

document.addEventListener("DOMContentLoaded", async function () {
    const disconnectBtn = document.getElementById("Desconectar");
    const endAppointmentBtn = document.getElementById("Terminar");
    const startAppointmentBtn = document.getElementById("Iniciar");
    const nextPatientBtn = document.getElementById("Proximo");
    const cancelAppointmentBtn = document.getElementById("Cancelar");

    // Recupera o ID do médico logado
    const user = JSON.parse(localStorage.getItem('user'));
    const doctor = new Doctor(1, user.name);
    let currentPatient = null;

    disconnectBtn.addEventListener("click", () => {
        if (confirm("Deseja realmente sair?")) {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        }
    });

    nextPatientBtn.addEventListener("click", () => {
        if (currentPatient) {
            alert("Finalize a consulta antes de chamar outro paciente.");
            return;
        }
    
        doctor.callNextPatient().then(result => {
            console.log("Resultado:", result);
            
            if (result.success) {
                currentPatient = result.paciente;
                loadPatientData(currentPatient);
            } else {
                alert(result.message);
            }
        }).catch(error => {
            console.error("Erro ao chamar o próximo paciente:", error);
        });
    });

    startAppointmentBtn.addEventListener("click", () => {
        if (!currentPatient) {
            alert("Nenhum paciente foi chamado.");
            return;
        }
        alert("Consulta iniciada para " + currentPatient.name);
    });

    endAppointmentBtn.addEventListener("click", async () => {
        if (!currentPatient) {
            alert("Nenhum paciente em atendimento.");
            return;
        }
        try {
            const result = await doctor.endAppointment(); // Aguarda a promessa ser resolvida
            alert(result.message);
            cleanPatientData();
            currentPatient = null;
        } catch (error) {
            console.error("Erro ao finalizar atendimento:", error);
        }
    });
    
    cancelAppointmentBtn.addEventListener("click", async () => {
        if (!currentPatient) {
            alert("Nenhum paciente para cancelar.");
            return;
        }
        try {
            const result = await doctor.cancelAppointment(); // Aguarda a promessa ser resolvida
            alert(result.message);
            cleanPatientData();
            currentPatient = null;
        } catch (error) {
            console.error("Erro ao cancelar atendimento:", error);
        }
    });
    
});

function loadPatientData(patient) {
    const fields = {
        Queixa: patient.queixa,
        Observacoes: patient.observacoes,
        Medicamento: patient.medicamentos,
        Alergia: patient.alergias,
        Dor: patient.dor,
        Temp: `${patient.temperatura}°C`,
        Arterial: patient.pressao,
        Cardiaca: `${patient.frequenciaCardiaca} bpm`,
        Respiratoria: `${patient.frequenciaRespiratoria} rpm`,
        Peso: `${patient.peso} kg`,
        especificidade: patient.especificidade,
        Es1: patient.es1,
        Es2: patient.es2,
        Es3: patient.es3,
        Es4: patient.es4
    };

    Object.keys(fields).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = fields[id];
        }
    });
}

function cleanPatientData() {
    document.querySelectorAll(".show-info-box, .show-info-line").forEach(element => {
        element.textContent = "";
    });
}
