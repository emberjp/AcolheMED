export class ApiService {
  login(username, password) {
    // Simula uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === "enfermeiro" && password === "123") {
          resolve({ success: true, userType: "enfermeiro" });
        } else if (username === "medico" && password === "123") {
          resolve({ success: true, userType: "medico" });
        } else if (username === "atendente" && password === "123") {
          resolve({ success: true, userType: "atendente" });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  }
}
