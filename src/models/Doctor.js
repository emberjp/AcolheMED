import ListaDeEspera from "./ListaDeEspera.js";
import Patient from "./Patient.js";

class Doctor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.currentPatient = null; // Paciente atualmente em atendimento
    }

    // Chama o próximo paciente da lista
    async callNextPatient() {
        if (this.currentPatient) {
            return { success: false, message: "Finalize o atendimento antes de chamar outro paciente." };
        }
        await ListaDeEspera.carregarLista();
        

        const lista = ListaDeEspera.obterLista();
        const nextPatient = lista.find(paciente => paciente.status === "esperando");

        if (!nextPatient) {
            return { success: false, message: "Nenhum paciente na fila." };
        }

        // Atualiza o status do paciente e salva a lista
        nextPatient.status = "em atendimento";
        nextPatient.doctor=this.name;
        await ListaDeEspera.atualizarLista(lista);
        const nPatient=new Patient(nextPatient.id,nextPatient.name,nextPatient.birthDate,nextPatient.cpf,nextPatient.gender,nextPatient.city,nextPatient.status,nextPatient.prontuario_id,nextPatient.prioridade,this.name);
        this.currentPatient = nPatient;
        
        return { success: true, paciente: nPatient };

    }

    async verifyCurrentPatient(){
        await ListaDeEspera.carregarLista();
        const lista = ListaDeEspera.obterLista();
        const possiblePatient = lista.find(paciente => (paciente.status === "esperando" || paciente.doctor==this.name));
        if(possiblePatient && possiblePatient.doctor == this.name)
           this.currentPatient=new Patient(possiblePatient.id,possiblePatient.name,
            possiblePatient.birthDate,possiblePatient.cpf,possiblePatient.gender,possiblePatient.city,possiblePatient.status,possiblePatient.prontuario_id,possiblePatient.prioridade,possiblePatient.doctor);

    }
    

    // Finaliza a consulta do paciente atual
    async endAppointment() {
        if (!this.currentPatient) {
            return { success: false, message: "Nenhum paciente em atendimento." };
        }

        await ListaDeEspera.removerPaciente(this.currentPatient.id);
        this.currentPatient.changeStatus("Atendido");
        this.currentPatient = null; // Médico fica livre
        return { success: true, message: "Atendimento finalizado." };
    }

    // Cancela a consulta e retorna o paciente à lista
    async cancelAppointment() {
        if (!this.currentPatient) {
            return { success: false, message: "Nenhum paciente para cancelar." };
        }

        await ListaDeEspera.carregarLista();
        let lista = ListaDeEspera.obterLista();

        // Atualiza o status do paciente de volta para "aguardando atendimento"
        const paciente = lista.find(p => p.id === this.currentPatient.id);
        if (paciente) {
            paciente.status = "cancelou consulta";
        }
        
        await ListaDeEspera.removerPaciente(this.currentPatient.id);
        this.currentPatient = null; // Médico fica livre

        return { success: true, message: "Consulta cancelada!." };
    }
}

export default Doctor;
