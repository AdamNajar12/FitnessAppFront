// src/Models/User.ts
export class User {
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  role: string;

  constructor(email: string, nom: string, prenom: string, telephone: string, password: string, confirmPassword: string, role: string) {
    this.email = email;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
  }
}
