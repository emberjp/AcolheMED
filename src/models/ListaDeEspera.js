class ListaDeEspera {
    constructor() {
        this.lista = [];
    }

    // Salva no localStorage
    salvarLista() {
        localStorage.setItem("ListaDeEspera", JSON.stringify(this.lista));
    }

    // Adiciona um paciente
    adicionarPaciente(paciente) {
        this.lista.push(paciente);
        this.salvarLista();
    }

    // Remove um paciente pelo ID
    removerPaciente(paciente) {
        this.lista.splice(this.lista.indexOf(paciente));
    }

    // Obtém todos os pacientes
    obterLista() {
        return this.lista;
    }

    // Limpa a lista de espera (se necessário)
    limparLista() {
        this.lista = [];
        this.salvarLista();
    }
}

// Criamos uma única instância para ser usada em todo o sistema
const listaDeEspera = new ListaDeEspera();
export default listaDeEspera;