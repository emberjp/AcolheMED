import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Caminhos dos arquivos JSON
const PRONTUARIOS_FILE = "prontuarios.json";


// Classe Prontuario (os prontuários são salvos permanentemente)
class Prontuario {
    constructor(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, freqCardiaca, freqRespiratoria, peso, especificidade, es1, es2, es3, es4, es5) {
        this.id = uuidv4(); // Identificador único para o prontuário
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
    static salvarProntuario(prontuario) {
        let prontuarios = [];
        if (fs.existsSync(PRONTUARIOS_FILE)) {
            prontuarios = JSON.parse(fs.readFileSync(PRONTUARIOS_FILE, "utf8"));
        }
        prontuarios.push(prontuario);
        fs.writeFileSync(PRONTUARIOS_FILE, JSON.stringify(prontuarios, null, 2));
    }

    static buscarProntuarioPorId(id) {
        if (!fs.existsSync(PRONTUARIOS_FILE)) return null;
        const prontuarios = JSON.parse(fs.readFileSync(PRONTUARIOS_FILE, "utf8"));
        return prontuarios.find(prontuario => prontuario.id === id) || null;
    }
}

export default Prontuario;