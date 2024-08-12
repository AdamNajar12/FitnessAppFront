import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'avoir react-router-dom installé et configuré
import { User } from '../Models/User';
import { Coach } from '../Models/Coach';
import { Paticipant } from '../Models/Client';
import { convertToUser } from './convertToUser';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | Coach | Paticipant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getUser', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const userData = response.data.data; // Access the nested data property
        console.log("Navbar user data:", userData);
        
        const userInstance = convertToUser(userData);
        setUser(userInstance);
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

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      navigate('/login'); // Rediriger vers la page de connexion après déconnexion
    } catch (error) {
      console.error('Failed to logout:', error);
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <header className="header_section">
      <div className="container">
        <div className="header_nav">
          <a className="navbar-brand brand_desktop" href="index.html">
            <img src="images/logo.png" alt="logo" />
          </a>
          <div className="main_nav">
            <div className="top_nav">
              <ul>
                {user ? (
                  <>
                    <li>
                      <a href="">
                        <img src="images/telephone.png" alt="telephone" />
                        <span>{user.telephone}</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/mail.png" alt="mail" />
                        <span>{user.email}</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/location.png" alt="location" />
                        <span>{user.role}</span>
                      </a>
                    </li>
                    {user instanceof Coach && (
                      <li>
                        <a href="">
                          <span>{user.specialite}</span>
                        </a>
                      </li>
                    )}
                    {user instanceof Paticipant && (
                      <li>
                        <a href="">
                          <span>{user.objectifs}</span>
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      <a href="">
                        <img src="images/telephone.png" alt="telephone" />
                        <span>+01 1234567890</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/mail.png" alt="mail" />
                        <span>demo@gmail.com</span>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src="images/location.png" alt="location" />
                        <span>Den mark Loram ipusum</span>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="bottom_nav">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <a className="navbar-brand brand_mobile" href="index.html">
                  <img src="images/logo.png" alt="logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <a className="nav-link" href="index.html">
                          Home <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="className.html">
                          Classes
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="blog.html">
                          Blog
                        </a>
                      </li>
                      <li className="nav-item">
                        <button className="btn btn-link nav-link" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                    <form className="form-inline">
                      <button className="btn ml-3 ml-lg-5 nav_search-btn" type="submit"></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
