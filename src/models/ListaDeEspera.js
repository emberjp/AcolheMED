class ListaDeEspera {
    static lista = [];
    static id=0;
    static async carregarLista() {
        try {
            const response = await fetch("/obter-lista");
            this.lista = await response.json();
        } catch (error) {
            console.error("Erro ao carregar lista de espera:", error);
        }
    }
    static async atualizarLista() {
        try {
            const resposta = await fetch("/atualizar-lista", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.lista),
            });

            if (!resposta.ok) throw new Error("Erro ao atualizar lista");

        } catch (error) {
            console.error("Erro ao atualizar lista:", error);
        }
    }
    static async adicionarPaciente(paciente) {
        try {
            const resposta = await fetch("http://localhost:3000/adicionar-paciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente)
            });

            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.message || "Erro ao adicionar paciente");

            console.log("Paciente adicionado com sucesso:", dados);
            
            paciente.id=dados.id;   
            // Atualiza a lista localmente
            this.lista.push(paciente);


            console.log("aaa",this.lista);

            
        } catch (erro) {
            console.error("Erro ao adicionar paciente:", erro);
        }
    }

    static async removerPaciente(idPaciente) {
        try {
            const resposta = await fetch("/remover-paciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idPaciente }),
            });

            if (!resposta.ok) throw new Error("Erro ao remover paciente");

            // Remove localmente
            this.lista = this.lista.filter(p => p.id !== idPaciente);
        } catch (error) {
            console.error("Erro ao remover paciente:", error);
        }
    }

    static obterLista() {
        return this.lista;
    }
}

export default ListaDeEspera;
