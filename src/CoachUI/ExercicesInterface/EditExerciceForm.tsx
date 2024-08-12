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
  programme: number; // Change to programme instead of programme_id
  programs: Program[];
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
    programme: 0, // Change to programme instead of programme_id
    programs: [],
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
        programme: exercice.programme.id, // Assuming the response includes program details
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

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { nom, type, duree, repetitions, sets, programme } = this.state;
    const { id, navigate } = this.props;

    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/exercice/${id}/`, {
          nom,
          type,
          duree,
          repetitions,
          sets,
          programme,
        });
      } else {
        await axios.post("http://localhost:8000/api/exercice/", {
          nom,
          type,
          duree,
          repetitions,
          sets,
          programme,
        });
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
    const { nom, type, duree, repetitions, sets, programme, programs } = this.state;

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

const EditExerciceFormWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return <EditExerciceForm id={id} navigate={navigate} />;
};

export default EditExerciceFormWrapper;
