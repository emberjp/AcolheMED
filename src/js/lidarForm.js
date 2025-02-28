import ListaDeEspera from "../models/ListaDeEspera.js";
import Prontuario from "../models/ProntuarioMed.js";
import Patient from "../models/Patient.js";

async function coletarDadosFormulario() {
    if(!enviar)
      return;
    enviar=false;
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
    var es2="";
    if(especificidade=="PA")
      es2 = parseFloat(document.getElementById("Es2").value);
    else 
      es2 = document.getElementById("Es2").value;
    const es3 = document.getElementById("Es3").checked;
    const es4 = document.getElementById("Es4").checked;
    const es5 = document.getElementById("Es5").checked;
    
    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("nascimento").value;
    const sexo = document.getElementById("sexo").value;
    const cidade = document.getElementById("cidade").value;
    const cpf = document.getElementById("cpf").value;

    const prontuario = new Prontuario(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, 
      freqCardiaca, freqRespiratoria, peso, especificidade, 
      es1, es2, es3, es4, es5);
      
    await prontuario.salvarProntuario();

    const prioridade=prontuario.classificaPrioridade();  
    if(prioridade===2 || prioridade===3){
      const paciente = new Patient(0,nome, nascimento, cpf, sexo, cidade, "esperando",prontuario.getId(),prioridade,"");

      ListaDeEspera.adicionarPaciente(paciente);
      console.log("Add");
      console.log("Prontuário criado:", prontuario);
    }
    return prontuario;
  }
  
  // Associar a função ao botão de confirmação
  document.getElementById("ButConfirmar").addEventListener("click", coletarDadosFormulario);