class Patient {
    constructor(name, birthDate, cpf, gender, city, status){
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.gender = gender;
        this.city = city;
        this.status = status;
    }

    getInfo(){
        return {
            name: this.name,
            birthDate: this.birthDate,
            cpf: this.cpf,
            gender: this.gender,
            city: this.city,
            status: this.status
        };
    }

    changeStatus(newStatus){
        this.status = newStatus;
    }


}

export default Patient;