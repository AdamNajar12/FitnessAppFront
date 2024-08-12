import React, { Component } from "react";
import { Navigate } from "react-router-dom"; // Importez Redirect pour la redirection
import axios from "axios";
import DashboardSlider from "../DashboardComponent/DashboradSlider";

type State = {
  nom: string;
  description: string;
  duree: number;
  redirect: string | null; // Stocke l'URL vers laquelle rediriger
};

class ProgramForm extends Component<{}, State> {
  state: State = {
    nom: "",
    description: "",
    duree: 0,
    redirect: null,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { nom, description, duree } = this.state;

    try {
      await axios.post("http://localhost:8000/api/programs/", {
        nom,
        description,
        duree,
      });
      this.setState({ redirect: "/Showprogram" }); // Redirige vers /Addprogram après la soumission
    } catch (error) {
      console.error("There was an error adding the program!", error);
    }
  };

  handleCancel = () => {
    this.setState({ redirect: "/Showprogram" }); // Redirige vers /Showprogram après l'annulation
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Navigate to={redirect} />;
    }

    return (
      <DashboardSlider>
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Add Program</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <label>Nom</label>
                            <input
                              type="text"
                              name="nom"
                              className="form-control form-control-lg"
                              placeholder="Enter Nom"
                              onChange={this.handleChange}
                            />
                            <small className="form-text text-muted">
                              Write your Program Name.
                            </small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                              name="description"
                              className="form-control form-control-lg"
                              id="description"
                              placeholder="Entrez la description"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Durée du programme</label>
                            <input
                              type="text"
                              name="duree"
                              className="form-control form-control-lg"
                              placeholder="Durée du programme"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <div className="card-action">
                              <button type="submit" className="btn" style={{ backgroundColor: "#63f74f", color: "white" }}>Submit</button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.handleCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                          {/* Ajoutez plus de champs si nécessaire */}
                        </form>
                      </div>
                      <div className="col-md-4">
                        <div className="img-box">
                          <img
                            src="images/footer-img.jpg"
                            alt="Footer"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardSlider>
    );
  }
}

export default ProgramForm;
