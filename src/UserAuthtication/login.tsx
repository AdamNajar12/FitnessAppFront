import React, { useState } from "react";
import axios from "axios";
import {jwtDecode }from 'jwt-decode'; // Correction de l'importation
import Navbarlogin from "../Nav/navbarLogin";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
// Définir un type personnalisé pour le payload du JWT


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { email, password },
        { withCredentials: true } // Assurez-vous que les cookies sont inclus dans les requêtes
      );

      // Le token JWT est dans la réponse et peut être utilisé pour les requêtes suivantes
      const token = response.data.jwt;

      // Stocker le token dans un cookie
      Cookies.set('jwt', token, { expires: 7 });

    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed!");
    }
  };

  return (
    <>
      <Navbarlogin />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="images/footer-img.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">Login</span>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
