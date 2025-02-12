import { LoginView } from "./views/LoginView.js";
import { LoginController } from "./controllers/LoginController.js";
import { ApiService } from "./services/ApiService.js";

// Inicializa a aplicação
const apiService = new ApiService();
const loginView = new LoginView();
const loginController = new LoginController(loginView, apiService);

loginController.init();
