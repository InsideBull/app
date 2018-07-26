export class Worker {
    matricule: string;
    name: string;
    type: string;
    image?: string;

    constructor(object?: {}){
        for (var key in object){
            this[key] = object[key];
        }
    } 
}