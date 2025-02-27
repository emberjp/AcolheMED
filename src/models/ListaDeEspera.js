import Patient from "./Patient.js";
class ListaDeEspera {
    static lista = [];
    static id=0;
    static async carregarLista() {
        try {
            const response = await fetch("/obter-lista");
    
            // Verifica se a resposta foi bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error("Erro ao carregar lista de espera, status: " + response.status);
            }
    
            // Tenta converter a resposta para JSON
            const data = await response.json();
    
            // Se a resposta não for um array válido ou estiver vazia, retorna um array vazio
            if (!Array.isArray(data) || data.length === 0) {
                this.lista = [];
            } else {
                this.lista = data;
            }
        } catch (error) {
            // Caso ocorra um erro, imprime a mensagem de erro e inicializa a lista como um array vazio
            console.error("Erro ao carregar lista de espera:", error);
            this.lista = [];
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
        /*try {
            const resposta = await fetch("/adicionar-paciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente)
            });
    
            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.message || "Erro ao adicionar paciente");
    
            console.log("Paciente adicionado com sucesso:", dados);
            
            paciente.id = dados.id;
            */
           try{
            await this.carregarLista();
           const tamanho=this.lista.length;
           if(tamanho===0)
                paciente.id=0;
           else
                paciente.id= ( ( this.lista[tamanho-1]).id + 1 ) ;
                if (paciente.prioridade === 2) {
                    // Pacientes de prioridade 2 sempre vão para o fim da fila
                    this.lista.push(paciente);
                } else {
                    // Paciente de prioridade 3 deve ser inserido estrategicamente
                    const limite85 = Math.floor(tamanho * 0.85); // 85% do tamanho da fila
                    let posicao = Math.floor(tamanho * 0.40); // 40% da fila
        
                    // Verifica se há uma sequência contínua de prioridade 3 a partir do primeiro encontrado
                    let contagemPrioridade3 = 0;
                    let encontrouPrimeiro = false;
                    let inicioSequencia = -1;
        
                    // Busca pela sequência de prioridade 3
                    for (let i = 0; i < tamanho; i++) {
                        if (this.lista[i].prioridade === 3) {
                            if (!encontrouPrimeiro) {
                                encontrouPrimeiro = true;
                                inicioSequencia = i;
                            }
                            contagemPrioridade3++;
                        } else if (encontrouPrimeiro) {
                            break; // Paramos de contar ao encontrar um diferente
                        }
                    }
        
                    // Se ultrapassar o limite de 85%, ajusta a posição
                    if (posicao > limite85) {
                        posicao = limite85;
                    }
        
                    if (encontrouPrimeiro && contagemPrioridade3 > 4) {
                        // Inserir a 1 de distância da sequência de prioridade 3
                        posicao = Math.min(inicioSequencia - 1, tamanho - 1); 
                    } else {
                        // Ajusta posição com base nas faixas de percentual
                        let distancia = 1; // Distância padrão
                        if (posicao >= Math.floor(tamanho * 0.50)) distancia = 2;
                        if (posicao >= Math.floor(tamanho * 0.65)) distancia = 3;
        
                        for (let i = posicao; i < tamanho; i++) {
                            if (this.lista[i].prioridade === 3) {
                                posicao = Math.max(i - distancia, 0);
                                break;
                            }
                        }
                    }
        
                    // Verifica concentração de prioridades 3 (mais de 15% consecutivas)
                    let concentracaoPrioridade3 = 0;
                    for (let i = posicao; i < tamanho; i++) {
                        if (this.lista[i].prioridade === 3) {
                            concentracaoPrioridade3++;
                        } else {
                            break;
                        }
                    }
        
                    if (concentracaoPrioridade3 >= Math.floor(tamanho * 0.15) && posicao < tamanho - 1) {
                        // Se concentração for maior que 15% e o paciente não estiver no final, coloca a 1 de distância
                        posicao = Math.max(posicao - 1, 0);
                    }
        
                    // Garante que o paciente não ultrapasse um que está "em atendimento"
                    while (posicao < tamanho && this.lista[posicao].status === "em atendimento") {
                        posicao++;
                    }
        
                    // Insere o paciente na lista
                    this.lista.splice(posicao, 0, paciente);
                }
                await this.atualizarLista();
                console.log("Lista de espera atualizada:", this.lista);
                
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
