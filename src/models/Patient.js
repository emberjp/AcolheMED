class Patient {
    constructor(id,name, birthDate, cpf, gender, city, status, prontuario_id){
        this.id=id;
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.gender = gender;
        this.city = city;
        this.status = status;
        this.prontuario_id=prontuario_id;
    }

    getInfo(){
        return {
            id:this.id,
            name: this.name,
            birthDate: this.birthDate,
            cpf: this.cpf,
            gender: this.gender,
            city: this.city,
            status: this.status,
            prontuario_id: this.prontuario_id
        };
    }

    changeStatus(newStatus){
        this.status = newStatus;
    }


}

export default Patient;