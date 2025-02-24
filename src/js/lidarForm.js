import ListaDeEspera from "../models/ListaDeEspera.js";
import Prontuario from "../models/ProntuarioMed.js";
import Patient from "../models/Patient.js";

async function coletarDadosFormulario() {
    const queixa = document.getElementById("Queixa").value;
    const observacoes = document.getElementById("Obsrvações").value;
    const medicamentos = document.getElementById("Medicamento").value;
    const alergias = document.getElementById("Alergia").value;
    const dor = parseInt(document.getElementById("Dor").value) || 0;
    const temperatura = parseFloat(document.getElementById("Temp").value) || 0;
    const pressaoArterial = parseInt(document.getElementById("Arterial").value) || 0;
    const freqCardiaca = parseInt(document.getElementById("Cardiaca").value) || 0;
    const freqRespiratoria = parseInt(document.getElementById("Respiratória").value) || 0;
    const peso = parseFloat(document.getElementById("Peso").value) || 0;
    const especificidade = document.getElementById("Especificidade").value;
    const es1 = parseFloat(document.getElementById("Es1").value) || 0;
    const es2 = parseFloat(document.getElementById("Es2").value) || 0;
    const es3 = document.getElementById("Es3").checked;
    const es4 = document.getElementById("Es4").checked;
    const es5 = document.getElementById("Es5").checked;
  
    const prontuario = new Prontuario(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, freqCardiaca, freqRespiratoria, peso, especificidade, es1, es2, es3, es4, es5);
    await prontuario.salvarProntuario();

    const paciente = new Patient(0,"Jon","01/07/1985","111","masculino","s","esperando",prontuario.getId());

    ListaDeEspera.adicionarPaciente(paciente);
    console.log("Add");
    console.log("Prontuário criado:", prontuario);
    
    return prontuario;
  }
  
  // Associar a função ao botão de confirmação
  document.getElementById("ButConfirmar").addEventListener("click", coletarDadosFormulario);