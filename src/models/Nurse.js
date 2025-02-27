const User = require("./User");

class Nurse extends User {
    constructor(username, password, type, occupation) {
        super(username, password, type, occupation);
    }
}

export default Nurse;