import React, { Component, ChangeEvent, FormEvent } from "react";
import Main from "../Main/main";
import './register.css'; // Importation du fichier CSS
import { User } from "../Models/User";
import { Coach } from "../Models/Coach";
import { Paticipant } from "../Models/Client";
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface RegisterProps {
  navigate: NavigateFunction;
}

interface RegisterState {
  role: 'coach' | 'client';
  formData: User | Coach | Paticipant & { confirmPassword: string };
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      role: 'client',
      formData: {
        email: '',
        nom: '',
        prenom: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        role: 'client',
        age: 0,
        poids: 0.0,
        objectifs: '',
        taille: 0.0,
        niveau: '',
      } as Paticipant & { confirmPassword: string },
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as 'coach' | 'client';
    this.setState({
      role,
      formData: role === 'coach' ? {
        email: '',
        nom: '',
        prenom: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        role: 'coach',
        specialite: '',
        review: 0,
      } as Coach & { confirmPassword: string } : {
        email: '',
        nom: '',
        prenom: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        role: 'client',
        age: 0,
        poids: 0.0,
        objectifs: '',
        taille: 0.0,
        niveau: '',
      } as Paticipant & { confirmPassword: string }
    });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { role, formData } = this.state;

    const dataToSend = {
      ...formData,
      role: role,
    };

    const endpoint = role === 'coach'
      ? 'http://127.0.0.1:8000/api/register/coach/'
      : 'http://127.0.0.1:8000/api/register/client/';

    console.log('Sending data:', dataToSend);

    try {
      const response = await axios.post(endpoint, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      this.props.navigate('/login'); // Rediriger vers la page de connexion après succès
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { role, formData } = this.state;

    return (
      <Main>
        <section className="contact_section">
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              <br />
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select name="role" value={role} onChange={this.handleRoleChange} className="form-control">
                  <option value="client">Client</option>
                  <option value="coach">Coach</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nom">Name</label>
                <input type="text" name="nom" placeholder="Name" value={formData.nom} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">First Name</label>
                <input type="text" name="prenom" placeholder="First Name" value={formData.prenom} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Phone Number</label>
                <input type="text" name="telephone" placeholder="Phone Number" value={formData.telephone} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={this.handleChange} />
              </div>
              {role === 'coach' && (
                <>
                  <div className="form-group">
                    <label htmlFor="specialite">Speciality</label>
                    <input type="text" name="specialite" placeholder="Speciality" value={(formData as Coach).specialite} onChange={this.handleChange} />
                  </div>

                </>
              )}
              {role === 'client' && (
                <>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" placeholder="Age" value={(formData as Paticipant).age} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="poids">Weight</label>
                    <input type="number" step="0.1" name="poids" placeholder="Weight" value={(formData as Paticipant).poids} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="objectifs">Objectives</label>
                    <input type="text" name="objectifs" placeholder="Objectives" value={(formData as Paticipant).objectifs} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taille">Height</label>
                    <input type="number" step="0.1" name="taille" placeholder="Height" value={(formData as Paticipant).taille} onChange={this.handleChange} />
                  </div>

                </>
              )}
              <div className="d-flex">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
          <div className="img-box">
            <img src="images/footer-img.jpg" alt="Footer" />
          </div>
        </section>
      </Main>
    );
  }
}

function withNavigation(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: any) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}

export default withNavigation(Register);
