import { Paticipant } from "./Client";
import { Coach } from "./Coach";

// src/Models/Program.ts
export class Program {
    id: number;
    nom: string;
    description: string;
    duree: string; // Assuming duration is a string based on your Django model
     // Assuming client is represented by an ID
  
    
    constructor(id: number, nom: string, description: string, duree: string) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.duree = duree;
      
    }
  }
  