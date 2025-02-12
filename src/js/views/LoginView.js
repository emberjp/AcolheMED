export class LoginView {
  constructor() {
    this.app = document.getElementById("app");
  }

  render() {
    this.app.innerHTML = `
            <h1>Login</h1>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Usuário" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
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
