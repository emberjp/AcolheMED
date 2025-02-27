
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
        this.prioridade = this.classificaPrioridade();
    }
    getId() {
        return this.id;
    }
    classificaPrioridade(){
        if(this.especificidade==="Intoxicações"){
            if(this.es3==true || this.es4==true){
                return 5;
            }
            if(this.es1<=6 && this.es2!="Nenhum"){
                return 4;
            }
            if(this.es1>=6 && this.es2==="Nenhum"){
                return 3;
            }
            if(this.es5==true){
                return 2;
            }
            return 1;
        }
        if(this.especificidade==="PA"){
            if((this.es2>130 || this.es1>85) && this.es4==true && this.es5==true)
                return 5;
            if((this.es2<=80 || this.es1<=60) && this.es3==true)
                return 5;
            if(this.es1>=130 && this.es4==true)
                return 4;
            if(this.es2>=220 && this.es4==true)
                return 4;
            if((this.es2>130 || this.es1>85) && this.es4==false && this.es5==true)
                return 4;
            if((this.es2<=80 || this.es1<=60) && this.es3==false)
                return 4;
            if((this.es2<=80 || this.es1<=60) && this.es5==true)
                return 4;
            if(this.es1>=130 && this.es4==false)
                return 3;
            if(this.es2>=220 && this.es4==false)
                return 3;
            if(this.es2>=180 && this.es2<=210 && this.es4==false)
                return 3;
            if(this.es1>=111 && this.es2<=113 && this.es4==false)
                return 3;
            if(this.es2<111 && this.es4==false)
                return 2;
            if(this.es2<180 && this.es4==false)
                return 2;
        }
        return 1;
    }
    // Salva o prontuário permanentemente no JSON
    async salvarProntuario() {
        try {
            const resposta = await fetch("/adicionar-prontuario", {
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
            const resposta = await fetch(`/obter-prontuario?id=${id}`);
            console.log("asa",resposta);
    
            return await resposta.json();
                

        } catch (error) {
            console.error("Erro ao obter prontuário:", error);
        }
    }
    static async obter(id){
        const pront= await this.obterProntuario(id) ;
        let prontuario=null;
        if(pront.id){
            prontuario=new Prontuario(pront.queixa, pront.observacoes, pront.medicamentos, 
                pront.alergias, pront.dor, pront.temperatura, pront.pressaoArterial, pront.freqCardiaca, pront.freqRespiratoria, pront.peso, pront.especificidade, 
                pront.es1, pront.es2, pront.es3, pront.es4, pront.es5);
            prontuario.id=pront.id;
        }    
        else{
            prontuario=new Prontuario("prontuário inválido(Não encontrado)", "prontuário inválido(Não encontrado)", "prontuário inválido(Não encontrado)", 
                "prontuário inválido(Não encontrado)", "-", "-", "-","-", "-", "-", "-", 
                "-", "-", "-", "-", "-");
        }
            
        return prontuario;
    }
}


export default Prontuario;