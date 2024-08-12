// src/Models/Client.ts
import { User } from './User';

export class Paticipant extends User {
  age: number;
  poids: number;
  objectifs: string;
  taille: number;
  niveau: string;

  constructor(
    email: string, 
    nom: string, 
    prenom: string, 
    telephone: string, 
    password: string,
    confirmPassword: string,
    role: string,
    age: number,
    poids: number,
    objectifs: string,
    taille: number,
    niveau: string
  ) {
    super(email, nom, prenom, telephone, password, confirmPassword, role);
    this.age = age;
    this.poids = poids;
    this.objectifs = objectifs;
    this.taille = taille;
    this.niveau = niveau;
  }
}
