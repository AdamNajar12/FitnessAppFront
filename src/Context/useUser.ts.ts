import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../Models/User';
import { Coach } from '../Models/Coach';
import { Paticipant } from '../Models/Client';

type UserType = User | Coach | Paticipant | null;

export const useUser = () => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State to store error messages

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getUser', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const userData = response.data;
        console.log(userData)

        // Adjust the creation of instances based on your models
        if (userData.role === 'Coach') {
          setUser(new Coach(userData.email, userData.nom, userData.prenom, userData.telephone, userData.password, userData.confirmPassword, userData.role, userData.specialite, userData.review));
        } else if (userData.role === 'Participant') {
          setUser(new Paticipant(userData.email, userData.nom, userData.prenom, userData.telephone, userData.password, userData.confirmPassword, userData.role, userData.age, userData.poids, userData.objectifs, userData.taille, userData.niveau));
        } else {
          setUser(new User(userData.email, userData.nom, userData.prenom, userData.telephone, userData.password, userData.confirmPassword, userData.role));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setError('Access forbidden: You do not have permission to access this resource.');
          } else {
            setError('Failed to fetch user data.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
