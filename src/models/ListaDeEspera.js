import fs from "fs";
import Prontuario from "../models/ProntuarioMed.js";


const LISTA_PACIENTES_FILE = "listaEspera.json";
class ListaDeEspera {
    constructor() {
        this.lista = this.carregarLista();
    }

    // Carrega a lista de pacientes do JSON
    carregarLista() {
        if (fs.existsSync(LISTA_PACIENTES_FILE)) {
            return JSON.parse(fs.readFileSync(LISTA_PACIENTES_FILE, "utf8"));
        }
        return [];
    }

    // Salva a lista de pacientes no JSON
    salvarLista() {
        fs.writeFileSync(LISTA_PACIENTES_FILE, JSON.stringify(this.lista, null, 2));
    }

    // Adiciona um paciente à lista de espera
    adicionarPaciente(paciente) {
        this.lista.push(paciente);
        this.salvarLista();
    }

    // Remove um paciente pelo ID
    removerPaciente(pacienteId) {
        this.lista = this.lista.filter(paciente => paciente.id !== pacienteId);
        this.salvarLista();
    }

    // Obtém todos os pacientes da lista de espera
    obterLista() {
        return this.lista;
    }

    // Chama o próximo paciente (remove da lista e retorna seus dados junto ao prontuário)
    chamarProximoPaciente() {
        if (this.lista.length === 0) return null;
        const paciente = this.lista.shift();
        this.salvarLista();
        const prontuario = Prontuario.buscarProntuarioPorId(paciente.prontuarioId);
        return { paciente, prontuario };
    }
}

// Criamos uma única instância da lista de espera para ser usada globalmente
const listaDeEspera = new ListaDeEspera();
export default listaDeEspera ;