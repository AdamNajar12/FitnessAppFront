import { Paticipant } from "./Client";
import { Coach } from "./Coach";
import { Program } from "./Program";

// src/Models/Exercice.ts
export class Exercice {
    id: number;
    nom: string;
    type: string;
    duree: string; 
    repetitions :number;
    sets:number;
    programme:Program;
    
    
  
    constructor(
        id: number,
        nom: string,
        type: string,
        duree: string,
        repetitions: number,
        sets: number,
        programme: Program = { id: 0, nom: '', description: '', duree: '' } // Valeur par défaut pour program
    ) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.duree = duree;
        this.repetitions = repetitions;
        this.sets = sets;
        this.programme = programme;
    }
    
  }
  