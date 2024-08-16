import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import { Program } from "../../Models/Program";


type State = {
  nom: string;
  type: string;
  duree: string;
  repetitions: number;
  sets: number;
  programme: number;
  programs: Program[];
  redirect: string | null;
  file: File | null;  // Ajoutez cet état pour gérer le fichier
};

class ExerciceForm extends Component<{}, State> {
 
  state: State = {
    nom: "",
    type: "",
    duree: "",
    repetitions: 0,
    sets: 0,
    programme: 0,
    programs: [],
    redirect: null,
    file: null,  // Initialise l'état du fichier
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8000/api/programs/");
      this.setState({ programs: response.data.results });
    } catch (error) {
      console.error("There was an error fetching the programs!", error);
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as any);
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    this.setState({ file });  // Mettez à jour l'état avec le fichier sélectionné
  };
  

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { nom, type, duree, repetitions, sets, programme, file } = this.state;
  
    try {
      let fileUrl = "";
      if (file) {
        // Si un fichier est sélectionné, téléchargez-le d'abord
        const formData = new FormData();
        formData.append("File", file);
  
        const fileUploadResponse = await axios.post("http://localhost:8000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,  // Assurez-vous que les cookies sont envoyés
        });
  
        fileUrl = fileUploadResponse.data.url.split('/').pop();  // Récupère l'URL du fichier téléchargé
      }
  
      // Affiche les données envoyées au serveur
      const dataToSend = {
        nom,
        type,
        duree,
        repetitions,
        sets,
        file: fileUrl,
        programme,
          // Inclut l'URL du fichier dans les données du formulaire
      };
      console.log("Data to send:", JSON.stringify(dataToSend, null, 2));
  
      // Soumettez ensuite le formulaire avec l'URL du fichier
      await axios.post("http://localhost:8000/api/exercice/", dataToSend, {
        withCredentials: true,  // Assurez-vous que les cookies sont envoyés
      });
  
      this.setState({ redirect: "/ShowExercices" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  
  handleCancel = () => {
    this.setState({ redirect: "/ShowExercices" });
  };

  render() {
    const { redirect, programs } = this.state;

    if (redirect) {
      return <Navigate to={redirect} />;
    }

    return (
      <DashboardSlider>
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Add Exercise</h3>
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
                              Write your Exercise Name.
                            </small>
                          </div>
                          <div className="form-group">
                            <label>Type</label>
                            <input
                              type="text"
                              name="type"
                              className="form-control form-control-lg"
                              placeholder="Enter Type"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Durée</label>
                            <input
                              type="text"
                              name="duree"
                              className="form-control form-control-lg"
                              placeholder="Enter Duration"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Repetitions</label>
                            <input
                              type="number"
                              name="repetitions"
                              className="form-control form-control-lg"
                              placeholder="Enter Repetitions"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Sets</label>
                            <input
                              type="number"
                              name="sets"
                              className="form-control form-control-lg"
                              placeholder="Enter Sets"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Upload Exercice tutorial</label>
                            <input
                              type="file"
                              name="file"
                              className="form-control form-control-lg"
                              onChange={this.handleFileChange}  // Gère la sélection du fichier
                            />
                          </div>
                          <div className="form-group">
                            <label>Programme</label>
                            <select
                              name="programme"
                              className="form-control form-control-lg"
                              onChange={this.handleChange}
                            >
                              <option value="">Select Program</option>
                              {programs.map((program) => (
                                <option key={program.id} value={program.id}>
                                  {program.nom}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <div className="card-action">
                              <button type="submit" className="btn" style={{ backgroundColor: "#63f74f", color: "white" }}>
                                Submit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.handleCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
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

export default ExerciceForm;
