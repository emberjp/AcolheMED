import { LoginView } from "../views/LoginView.js";
import { ApiService } from "../services/ApiService.js";

export class LoginController {
  constructor(view, apiService) {
    this.view = view;
    this.apiService = apiService;
  }

  init() {
    this.view.render();
    this.view.bindLogin(this.handleLogin.bind(this));
  }

  handleLogin(event) {
    event.preventDefault();
    const credentials = this.view.getCredentials();

    // Simula a autenticação
    this.apiService
      .login(credentials.username, credentials.password)
      .then((response) => {
        if (response.success) {
          // Redireciona para a tela correta com base no tipo de usuário
          this.redirectUser(response.userType);
        } else {
          alert("Login falhou! Verifique suas credenciais.");
        }
      });
  }

  redirectUser(userType) {
    switch (userType) {
      case "enfermeiro":
        window.location.href = "nurse.html"; // Redireciona para a tela do enfermeiro
        break;
      case "medico":
        window.location.href = "doctor.html"; // Redireciona para a tela do médico
        break;
      case "atendente":
        window.location.href = "receptionist.html"; // Redireciona para a tela do atendente
        break;
      default:
        alert("Tipo de usuário desconhecido!");
    }
  }
}
