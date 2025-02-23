
// Classe Prontuario (os prontuários são salvos permanentemente)
class Prontuario {
    constructor(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, freqCardiaca, freqRespiratoria, peso, especificidade, es1, es2, es3, es4, es5) {
        this.id = 0; // Identificador único para o prontuário
        this.queixa = queixa;
        this.observacoes = observacoes;
        this.medicamentos = medicamentos;
        this.alergias = alergias;
        this.dor = dor;
        this.temperatura = temperatura;
        this.pressaoArterial = pressaoArterial;
        this.freqCardiaca = freqCardiaca;
        this.freqRespiratoria = freqRespiratoria;
        this.peso = peso;
        this.especificidade = especificidade;
        this.es1 = es1;
        this.es2 = es2;
        this.es3 = es3;
        this.es4 = es4;
        this.es5 = es5;
        this.prioridade = 3;
    }
    getId() {
        return this.id;
    }
    classificaPrioridade(){
        return this.prioridade;
    }
    // Salva o prontuário permanentemente no JSON
    async salvarProntuario() {
        try {
            const resposta = await fetch("http://localhost:3000/adicionar-prontuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this)
            });
    
            const dados = await resposta.json();
            if (!resposta.ok) throw new Error(dados.message || "Erro ao salvar prontuário");
    
            this.id = dados.id; // Atualiza o ID com o que foi salvo no servidor
            console.log("Prontuário salvo com sucesso:", dados);
        } catch (error) {
            console.error("Erro ao salvar prontuário:", error);
        }
    }
    
    static async obterProntuario(id) {
        try {
            const resposta = await fetch(`http://localhost:3000/obter-prontuario?id=${id}`);
            if (!resposta.ok) throw new Error("Erro ao obter prontuário");
    
            return await resposta.json();
        } catch (error) {
            console.error("Erro ao obter prontuário:", error);
        }
    }
}


export default Prontuario;