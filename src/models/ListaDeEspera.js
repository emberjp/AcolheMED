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
                paciente.id= ( ( this.lista[tamanho-1]).id) ;
                if (paciente.prioridade === 2) {
                    // Pacientes de prioridade 2 sempre vão para o fim da fila
                    this.lista.push(paciente);
                } else {
                    // Paciente de prioridade 3 deve ser inserido estrategicamente
                    const limite15 = Math.floor(tamanho * 0.15); // 15% do tamanho da fila
                    let posicao=tamanho-1;
        
                    let contagemPrioridade3 = 0;
                    let encontrouPrimeiro = false;
        
                    // Busca pela sequência de prioridade 3
                    let i = tamanho-1;
                    for (; i >=0 &&(tamanho>2 && i>=limite15); i--) {
                        if(this.lista[i].status!=="esperando")
                            break;
                        if (this.lista[i].prioridade === 3) {
                            if (!encontrouPrimeiro) {
                                encontrouPrimeiro = true;
                                posicao = i;
                            }
                            contagemPrioridade3++;
                        } else if (encontrouPrimeiro) {
                            break;
                        }
                    }
                    if(!encontrouPrimeiro)
                        posicao=i;
                    console.log("aab",posicao);

                    if(posicao>=(tamanho-1))
                        this.lista.push(paciente)
                    else{
                        let maximaConc= Math.min(4,Math.max(1,0.4*tamanho))
                        let distancia=0;
                        console.log(maximaConc," ",contagemPrioridade3);
                        if (contagemPrioridade3 > maximaConc) {
                            // Inserir a 1 de distância da sequência de prioridade 3
                            distancia=1; 
                        } 
                        
                        if (posicao < Math.floor(tamanho * 0.60)){
                            if (posicao >= Math.floor(tamanho * 0.5)) 
                                distancia = 1;
                            else if(posicao >= Math.floor(tamanho * 0.35)) 
                                distancia=2;
                            else
                                 distancia=3;

                        }
                        console.log("dis",distancia);
                        distancia= Math.min(distancia,Math.floor(tamanho/12)+1);
                        posicao=Math.min((posicao+distancia),tamanho-1);
                    

        
                        // Insere o paciente na lista
                        console.log("pos:",posicao );
                        this.lista.splice(posicao+1, 0, paciente);
                             
                    }
                }
                (this.lista[tamanho]).id=paciente.id+1;
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
