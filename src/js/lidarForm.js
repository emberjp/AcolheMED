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

    const prontuario = new Prontuario(queixa, observacoes, medicamentos, alergias, dor, temperatura, pressaoArterial, 
      freqCardiaca, freqRespiratoria, peso, especificidade, 
      es1, es2, es3, es4, es5);
    
    await prontuario.salvarProntuario();

    const prioridade=prontuario.classificaPrioridade();  
    if(prioridade===2 || prioridade===3){
      const paciente = new Patient(0,"Jon","01/07/1985","111","masculino","s","esperando",prontuario.getId(),prioridade,"");

      ListaDeEspera.adicionarPaciente(paciente);
      console.log("Add");
      console.log("Prontuário criado:", prontuario);
    }
    setTimeout(() => MostrarPopup(prioridade), 100); 
    return prontuario;
  }
    function MostrarPopup(prioridade) {
      // Mapeamento de cores e nomes
      const prioridades = {
          1: { cor: "#0000FF", nome: "Azul" },
          2: { cor: "#00FF00", nome: "Verde" },
          3: { cor: "#FFFF00", nome: "Amarelo" },
          4: { cor: "#FFA500", nome: "Laranja" },
          5: { cor: "#FF0000", nome: "Vermelho" }
      };
  
      // Criar elementos do popup
      const popup = document.createElement("div");
      const conteudo = document.createElement("div");
      const texto = document.createElement("p");
      const botaoFechar = document.createElement("button");
  
      // Estilização do popup
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.backgroundColor = "rgba(0,0,0,0.5)";
      popup.style.display = "flex";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.zIndex = "1000";
  
      // Estilização do conteúdo
      conteudo.style.backgroundColor = prioridades[prioridade].cor;
      conteudo.style.padding = "2rem";
      conteudo.style.borderRadius = "15px";
      conteudo.style.textAlign = "center";
      conteudo.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
  
      // Texto do popup
      texto.textContent = `Prioridade ${prioridade} - ${prioridades[prioridade].nome}`;
      texto.style.color = "#fff";
      texto.style.fontSize = "1.5rem";
      texto.style.marginBottom = "1rem";
  
      // Botão de fechar
      botaoFechar.textContent = "Fechar";
      botaoFechar.style.padding = "0.5rem 2rem";
      botaoFechar.style.borderRadius = "20px";
      botaoFechar.style.border = "none";
      botaoFechar.style.cursor = "pointer";
      botaoFechar.style.backgroundColor = "#7d7d7d";
  
      // Montagem dos elementos
      conteudo.appendChild(texto);
      conteudo.appendChild(botaoFechar);
      popup.appendChild(conteudo);
      document.body.appendChild(popup);
  
      // Fechar o popup
      botaoFechar.addEventListener("click", () => {
          document.body.removeChild(popup);
      });
  }

  // Associar a função ao botão de confirmação
  document.getElementById("ButConfirmar").addEventListener("click", coletarDadosFormulario);