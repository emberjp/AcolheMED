const User = require("./User");

class Receptionist extends User {
    constructor(username, password, type, occupation) {
        super(username, password, type, occupation);
    }
}

module.exports = Receptionist;