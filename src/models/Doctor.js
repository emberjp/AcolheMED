import ListaDeEspera from "./ListaDeEspera.js";

class Doctor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.currentPatient = null; // Paciente atualmente em atendimento
    }

    // Chama o próximo paciente da lista
    async callNextPatient() {
        
        await ListaDeEspera.carregarLista();
        if (this.currentPatient) {
            return { success: false, message: "Finalize o atendimento antes de chamar outro paciente." };
        }

        const lista = ListaDeEspera.obterLista();
        const nextPatient = lista.find(paciente => paciente.status === "esperando");

        if (!nextPatient) {
            return { success: false, message: "Nenhum paciente na fila." };
        }

        // Atualiza o status do paciente e salva a lista
        nextPatient.status = "em atendimento";
        await ListaDeEspera.atualizarLista(lista);

        this.currentPatient = nextPatient;
        
        return { success: true, paciente: nextPatient };

    }

    // Finaliza a consulta do paciente atual
    async endAppointment() {
        if (!this.currentPatient) {
            return { success: false, message: "Nenhum paciente em atendimento." };
        }

        await ListaDeEspera.removerPaciente(this.currentPatient.id);

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
            paciente.status = "aguardando atendimento";
        }
        
        await ListaDeEspera.atualizarLista(lista);
        this.currentPatient = null; // Médico fica livre

        return { success: true, message: "Consulta cancelada. Paciente retornou à lista." };
    }
}

export default Doctor;
