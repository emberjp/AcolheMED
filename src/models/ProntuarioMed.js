class Prontuario {
    constructor(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, freqCardiaca, freqRespiratoria, peso, especificidade, es1, es2, es3, es4, es5) {
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
        this.prioridade=3;
    }
}

export default Prontuario;