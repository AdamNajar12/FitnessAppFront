import React, { Component } from "react";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Program } from "../../Models/Program";

type State = {
  nom: string;
  type: string;
  duree: string;
  repetitions: number;
  sets: number;
  programme: number;
  programs: Program[];
  fileName?: string; // Stocker le nom du fichier
  file?: File; // Conserver le fichier sélectionné
};

type Props = {
  id?: string;
  navigate: (path: string) => void;
};

class EditExerciceForm extends Component<Props, State> {
  state: State = {
    nom: "",
    type: "",
    duree: "",
    repetitions: 0,
    sets: 0,
    programme: 0,
    programs: [],
    fileName: "", // Initialiser le nom du fichier
    file: undefined, // Aucun fichier sélectionné par défaut
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.fetchExercice(id);
    }
    this.fetchPrograms();
  }

  fetchExercice = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/exercice/${id}/`);
      const exercice = response.data;
      this.setState({
        nom: exercice.nom,
        type: exercice.type,
        duree: exercice.duree,
        repetitions: exercice.repetitions,
        sets: exercice.sets,
        fileName: exercice.file, // Assurez-vous que c'est le nom du fichier
        programme: exercice.programme.id,
      });
    } catch (error) {
      console.error("Error fetching the exercise!", error);
    }
  };

  fetchPrograms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/programs/");
      this.setState({ programs: response.data.results });
    } catch (error) {
      console.error("There was an error fetching the programs!", error);
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    if (file) {
      this.setState({ file, fileName: file.name });
    }
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { nom, type, duree, repetitions, sets, programme, fileName, file } = this.state;
    const { id, navigate } = this.props;

    try {
      let newFileName = fileName; // Conserver le nom du fichier existant par défaut

      // Vérifier si un nouveau fichier a été sélectionné
      if (file) {
        // Préparer les données pour le téléchargement du fichier
        const formData = new FormData();
        formData.append("File", file);

        // Télécharger le fichier
        const fileUploadResponse = await axios.post("http://localhost:8000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        // Extraire le nom du fichier (ou le chemin complet si nécessaire)
        newFileName = fileUploadResponse.data.url.split('/').pop(); // Extraire le nom du fichier
      }

      // Soumettre les données de l'exercice avec le nom du fichier
      const exerciseData = {
        nom,
        type,
        duree,
        repetitions,
        sets,
        programme,
        file: newFileName,  // Utiliser le nom du fichier
      };

      if (id) {
        await axios.put(`http://localhost:8000/api/exercice/${id}/`, exerciseData);
      } else {
        await axios.post("http://localhost:8000/api/exercice/", exerciseData);
      }

      navigate("/ShowExercices");
    } catch (error) {
      console.error("Error saving the exercise!", error);
    }
  };

  handleCancel = () => {
    this.props.navigate("/ShowExercices");
  };

  render() {
    const { nom, type, duree, repetitions, sets, programme, programs, fileName } = this.state;

    return (
      <DashboardSlider>
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Edit Exercise</h3>
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
                              value={nom}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Enter Nom"
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
                              value={type}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Enter Type"
                            />
                          </div>
                          <div className="form-group">
                            <label>Durée</label>
                            <input
                              type="text"
                              name="duree"
                              value={duree}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Enter Duration"
                            />
                          </div>
                          <div className="form-group">
                            <label>Repetitions</label>
                            <input
                              type="number"
                              name="repetitions"
                              value={repetitions}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Enter Repetitions"
                            />
                          </div>
                          <div className="form-group">
                            <label>Sets</label>
                            <input
                              type="number"
                              name="sets"
                              value={sets}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Enter Sets"
                            />
                          </div>
                          <div className="form-group">
                            <label>Programme</label>
                            <select
                              name="programme"
                              value={programme}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
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
                            <label>Fichier</label>
                            <input
                              type="file"
                              name="file"
                              onChange={this.handleFileChange}
                              className="form-control form-control-lg"
                            />
                            {fileName && (
                              <p className="form-text text-muted">Current file: {fileName}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <div className="card-action">
                              <button className="btn btn-success" type="submit">
                                Submit
                              </button>
                              <button
                                className="btn btn-danger"
                                type="button"
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
                            src="/images/footer-img.jpg"
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

const EditExerciceFormWrapper = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <EditExerciceForm {...props} id={id} navigate={navigate} />;
};

export default EditExerciceFormWrapper;
  