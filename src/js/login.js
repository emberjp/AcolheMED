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

//checks the login informations and redirects the user to their respective pages
async function checkCredentials(username, password, errorMessage) {
    if (username === "" || password === "") {
        errorMessage.textContent = "Preencha todos os campos!";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const response = await fetch("/check-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!data.success) {
            alert("Usuário ou senha incorretos!");
            errorMessage.style.display = "block";
        } else {
            alert("Login bem-sucedido!");
            
            // Redireciona com base no tipo de usuário
            if (data.role === "doctor") {
                window.location.href = "doctor.html";
                localStorage.setItem("user", JSON.stringify({name:username, role: "doctor" }));
            } else if (data.role === "nurse") {
                window.location.href = "nurse.html";
                localStorage.setItem("user", JSON.stringify({name:username, role: "nurse" }));
            } else if (data.role === "receptionist") {
                window.location.href = "receptionist.html";
                localStorage.setItem("user", JSON.stringify({name:username, role: "receptionist" }));
            }
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        errorMessage.textContent = "Erro ao conectar com o servidor.";
        errorMessage.style.display = "block";
    }
}

//checks if the user is in db, returns a tuple[bool, int] indicating [is in db, user type]
//this is just a test function
//types: 0-doctor, 1-nurse, 2-receptionist
function checkDataBase(username, password) {
    if(username === "doctor" && password === "123")
        return [true, 0];
    else if(username === "nurse" && password === "123")
        return [true, 1]
    else if(username === "jorge" && password === "123")
        return [true, 2]
    else
        return [false, -1];
}

function checkAuthForLoginPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Se houver usuário logado, redireciona para sua página principal
        const accessRules = {
            'doctor': 'doctor.html',
            'nurse': 'nurse.html',
            'receptionist': 'receptionist.html'
        };
        window.location.href = accessRules[user.role];
        return;
    }
}

// Chamar a verificação de login e permissão ao carregar as páginas protegidas
checkAuthForLoginPage();