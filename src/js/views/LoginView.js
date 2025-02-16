export class LoginView {
  constructor() {
    this.app = document.getElementById("app");
  }

  render() {
    this.app.innerHTML = `
      <div class="container">
        <form id="loginForm">
          <label for="username">Login</label>
          <input type="text" id="username" placeholder="Usuário" required>
          
          <label for="password">Senha</label>
          <input type="password" id="password" placeholder="Senha" required>
          
          <button type="submit">Entrar</button>
        </form>
      </div>
    `;
  }
    
  getCredentials() {
    return {
            username: document.getElementById("username").value,
          password: document.getElementById("password").value,
    };
  }

  bindLogin(handler) {
    document.getElementById("loginForm").addEventListener("submit", handler);
  }
}
