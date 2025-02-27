import Doctor from "../models/Doctor.js";
import Prontuario from "../models/ProntuarioMed.js";
import Patient from "../models/Patient.js";

document.addEventListener("DOMContentLoaded", async function () {
    const disconnectBtn = document.getElementById("Desconectar");
    const endAppointmentBtn = document.getElementById("Terminar");
    const startAppointmentBtn = document.getElementById("Iniciar");
    const nextPatientBtn = document.getElementById("Proximo");
    const cancelAppointmentBtn = document.getElementById("Cancelar");

    // Recupera o ID do médico logado
    const user = JSON.parse(localStorage.getItem('user'));
    const doctor = new Doctor(1, user.name);
    console.log(user);
    console.log(doctor);
    await doctor.verifyCurrentPatient();
    var currentPatient = doctor.currentPatient;
    console.log("corrente",currentPatient);
    if(currentPatient)
        await loadPatientData(currentPatient);
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

async function loadPatientData(patient) {
    console.log("aa",patient)
    const prontuario = await Prontuario.obter(patient.getProntuarioId());
    console.log(prontuario);
    const fields = {
        Queixa: prontuario.queixa,
        Obsrvações: prontuario.observacoes,
        Medicamento: prontuario.medicamentos,
        Alergia: prontuario.alergias,
        Dor: prontuario.dor,
        Temp: `${prontuario.temperatura}°C`,
        Arterial: prontuario.pressaoArterial,
        Cardiaca: `${prontuario.freqCardiaca} bpm`,
        Respiratória: `${prontuario.freqRespiratoria} rpm`,
        Peso: `${prontuario.peso} kg`,
        especificidade: prontuario.especificidade,
        Es1: prontuario.es1,
        Es2: prontuario.es2,
        Es3: prontuario.es3,
        Es4: prontuario.es4
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
