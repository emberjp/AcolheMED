const User = require("./User");

class Doctor extends User {
    constructor(username, password, type, occupation) {
        super(username, password, type, occupation);
    }

    assistPatient(){

    }

    endAppointment(){

    }

    cancelAppiontment(){

    }

    callNextPatient(){

    }
}

module.exports = Doctor;