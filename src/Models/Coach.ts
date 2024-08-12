// src/Models/Coach.ts
import { User } from './User';

export class Coach extends User {
  specialite: string;
  review: number;

  constructor(
    email: string, 
    nom: string, 
    prenom: string, 
    telephone: string, 
    password: string, 
    confirmPassword: string, 
    role: string,
    specialite: string, 
    review: number = 0
  ) {
    super(email, nom, prenom, telephone, password, confirmPassword, role);
    this.specialite = specialite;
    this.review = review;
  }
}
