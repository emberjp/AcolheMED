class Patient {
    constructor(id,name, birthDate, cpf, gender, city, status, prontuario_id,prioridade,doctor){
        this.id=id;
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.gender = gender;
        this.city = city;
        this.status = status;
        this.prontuario_id=prontuario_id;
        this.prioridade=prioridade;
        this.doctor=doctor;
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
            prontuario_id: this.prontuario_id,
            prioridade:this.prioridade,
            doctor:this.doctor
        };
    }

    changeStatus(newStatus){
        this.status = newStatus;
    } 

    getProntuarioId(){
        return this.prontuario_id;
    }
   
    getPrioridade(){
        return this.prioridade;
    }
    setDoctor(doctor){
        this.doctor=doctor;
    }
}

export default Patient;