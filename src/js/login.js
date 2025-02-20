document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        checkCredentials(username, password, errorMessage);
    });
});

function checkCredentials(username, password, errorMessage) {
    if (username === "" || password === "") {
        errorMessage.textContent = "Preencha todos os campos!";
        errorMessage.style.display = "block";
        return;
    }
    checkDataBase(username, password, errorMessage);
}

function checkDataBase(username, password, errorMessage) {
    if (!isInDataBase(username, password)) {
        alert("Usuário ou senha incorretos!");
        errorMessage.style.display = "block";
    } else {
        alert("Login bem-sucedido!");
        switch (findUserType(username, password)) {
            case 0:
                window.location.href = "doctor.html";
                break;
            case 1:
                window.location.href = "nurse.html";
                break;
            case 2:
                window.location.href = "receptionist.html";
                break;
        }
    }
}

function isInDataBase(username, password) {
    if(true){
        return username === "admin" && password === "12";
    } else {
        return false;
    }
    
}

function findUserType(username, password) {
    return 0; // Aqui você pode adicionar lógica real para diferenciar usuários
}
