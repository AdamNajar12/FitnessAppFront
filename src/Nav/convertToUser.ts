// src/utils/convertToUser.ts
import { User } from '../Models/User';
import { Coach } from '../Models/Coach';
import { Paticipant } from '../Models/Client';

export const convertToUser = (userData: any): User | Coach | Paticipant | null => {
  const { email, nom, prenom, telephone, password, confirmPassword, role, specialite, review, age, poids, objectifs, taille, niveau } = userData;

  switch (role) {
    case 'Coach':
      return new Coach(email, nom, prenom, telephone, password, confirmPassword, role, specialite, review);
    case 'Participant':
      return new Paticipant(email, nom, prenom, telephone, password, confirmPassword, role, age, poids, objectifs, taille, niveau);
    default:
      return new User(email, nom, prenom, telephone, password, confirmPassword, role);
  }
};
