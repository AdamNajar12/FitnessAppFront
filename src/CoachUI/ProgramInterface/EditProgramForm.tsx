import React, { Component } from "react";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type State = {
  nom: string;
  description: string;
  duree: string;
};

type Props = {
  id?: string;
  navigate: (path: string) => void;
};

class EditProgramForm extends Component<Props, State> {
  state: State = {
    nom: "",
    description: "",
    duree: "",
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.fetchProgram(id);
    }
  }

  fetchProgram = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/programs/${id}/`);
      const program = response.data;
      this.setState({
        nom: program.nom,
        description: program.description,
        duree: program.duree,
      });
    } catch (error) {
      console.error("Error fetching the program!", error);
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { nom, description, duree } = this.state;
    const { id, navigate } = this.props;

    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/programs/${id}/`, {
          nom,
          description,
          duree,
        });
      } else {
        await axios.post("http://localhost:8000/api/programs/", {
          nom,
          description,
          duree,
        });
      }
      navigate("/Showprogram");
    } catch (error) {
      console.error("Error saving the program!", error);
    }
  };

  handleCancel = () => {
    this.props.navigate("/Showprogram");
  };

  render() {
    const { nom, description, duree } = this.state;

    return (
      <DashboardSlider>
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Programs</h3>
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
                              Write your Program Name.
                            </small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                              className="form-control form-control-lg"
                              id="description"
                              name="description"
                              value={description}
                              onChange={this.handleChange}
                              placeholder="Entrez la description"
                            />
                          </div>
                          <div className="form-group">
                            <label>Durée du programme</label>
                            <input
                              type="text  "
                              name="duree"
                              value={duree}
                              onChange={this.handleChange}
                              className="form-control form-control-lg"
                              placeholder="Durée du programme"
                            />
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
                          {/* Ajoutez plus de champs si nécessaire */}
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

const EditProgramFormWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  console.log('EditProgramFormWrapper id:', id);  // Log the id for debugging
  console.log('EditProgramFormWrapper navigate:', navigate);  // Log the navigate function for debugging

  return <EditProgramForm id={id} navigate={navigate} />;
};

export default EditProgramFormWrapper;
