import ListaDeEspera from "../models/ListaDeEspera.js";
import Prontuario from "../models/ProntuarioMed.js";

document.addEventListener("DOMContentLoaded", () => {
  const proximosDiv = document.getElementById("proximos");
  const filaDiv = document.getElementById("fila");
  const atualizarBtn = document.getElementById("atualizar");
  const desconectarBtn = document.getElementById("desconectar");

  // Função para carregar os pacientes do JSON local
  async function carregarPacientes() {
    try {
      // Carrega o arquivo JSON local
      await ListaDeEspera.carregarLista();
      const pacientes = ListaDeEspera.obterLista();

      // Limpa as divs
      proximosDiv.innerHTML = "";
      filaDiv.innerHTML = "";

      // Processa cada paciente
      for (let i = 0; i < pacientes.length; i++) {
        const paciente = pacientes[i];
        let prontuario = null;

        // Verifica se o paciente tem um prontuário associado
        if (paciente.prontuario_id) {
          prontuario = await Prontuario.obter(paciente.prontuario_id);
        }

        // Cria o card do paciente
        const pacienteCard = document.createElement("div");
        pacienteCard.className = "paciente-card";

        // Define a cor de fundo com base na prioridade
        if (prontuario) {
          if (prontuario.prioridade === 2) {
            pacienteCard.classList.add("prioridade-2"); // Azul
          } else if (prontuario.prioridade === 3) {
            pacienteCard.classList.add("prioridade-3"); // Amarelo
          }
        }

        // Adiciona o nome do paciente ao card
        pacienteCard.textContent = paciente.name;

        // Adiciona o card à seção correta
        if (i < 2) {
          proximosDiv.appendChild(pacienteCard);
        } else {
          filaDiv.appendChild(pacienteCard);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    }
  }

  // Botão "Atualizar"
  atualizarBtn.addEventListener("click", carregarPacientes);

  // Botão "Desconectar"
  desconectarBtn.addEventListener("click", () => {
    if (confirm("Deseja realmente sair?")) {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    }
  });

  // Carrega os pacientes ao abrir a tela
  carregarPacientes();
});
