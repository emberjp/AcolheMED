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
    var l1 = 'Tempo da ingestão/inalação';
    var l2 = 'Sintomas';
    var l3 = 'Anafilia';
    var l4 ='Alteração do nivel de consciência';
    var l5 = 'Alterações dérmicas apenas locais';


    if(prontuario.especificidade==='PA')
    {
        l1= 'PAD';
        l2= 'PAS';
        l3= 'Sinais de choque';
        l4= 'Sintomas Associados';
        l5= 'Criança';

    }
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
        Es4: prontuario.es4,
        Es5: prontuario.es5,
        Les1: l1,
        Les2: l2,
        Les3: l3,
        Les4: l4,
        Les5: l5
    };
   /* var Label1 =document.getElementById('Les1');
    var Label2 =document.getElementById('Les2');
    var Label3 =document.getElementById('Les3');
    var Label4 =document.getElementById('Les4');
    var Label5 =document.getElementById('Les5');
    if(especificidade==='PA')
        {
            Label1.textContent ="PAD";
            Label2.textContent="PAS";
            Label3.textContent="Sinais de choque";
             Label4.textContent ="Sintomas Associados";
             Label5.textContent ="Criança";
        }
    if(especificidade==='Intoxicações')
        {
            Label1.textContent ="Tempo da ingestão/inalação";
            Label2.textContent ="Sintomas";
            Label3.textContent ="Anafilia";
            Label4.textContent ="Alteração do nivel de consciência";
            Label5.textContent ="Alterações dérmicas apenas locais";
        }*/

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
