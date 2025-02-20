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
function checkCredentials(username, password, errorMessage) {
    if (username === "" || password === "") {
        errorMessage.textContent = "Preencha todos os campos!";
        errorMessage.style.display = "block";
        return;
    }
    
    const data = checkDataBase(username, password);//(is in data base, user type)

    if (!data[0]) {
        alert("Usuário ou senha incorretos!");
        errorMessage.style.display = "block";
    } else {
        alert("Login bem-sucedido!");
        const userType = data[1];
        
        if(userType === 0){
            window.location.href = "doctor.html";
        }
        else if(userType === 1){
                window.location.href = "nurse.html";
        }
        else if(userType === 2){
                window.location.href = "receptionist.html";
        }
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