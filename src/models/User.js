class User {
    constructor(username, password, type, occupation) {
        this.usernamename = username;
        this.password = password;
        this.type = type;
        this.occupation = occupation;
    }

    getProfile(){
        return {
            username: this.username,
            password: this.password,
            type: this.type,
            occupation: this.occupation
        };
    }

    getType(){
        return this.type;
    }

    login(){

    }

    logout(){
        
    }
}

module.exports = User;
