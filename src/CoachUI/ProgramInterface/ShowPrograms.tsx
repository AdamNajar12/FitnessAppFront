import React, { Component } from "react";
import axios from "axios";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import { Program } from "../../Models/Program";
import { Link } from "react-router-dom"; // Import Link

type State = {
  programs: Program[];
};

class Programs extends Component<{}, State> {
  state: State = {
    programs: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/programs/");
      const programs = response.data.results || [];
      this.setState({ programs });
    } catch (error) {
      console.error("There was an error fetching the programs!", error);
      this.setState({ programs: [] });
    }
  };

  handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/programs/${id}/`);
      this.setState((prevState) => ({
        programs: prevState.programs.filter((program) => program.id !== id),
      }));
    } catch (error) {
      console.error("There was an error deleting the program!", error);
    }
  };

  render() {
    const { programs } = this.state;

    return (
      <DashboardSlider>
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Programs</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <Link
                    to="/AddProgram"
                    className="btn btn-primary btn-round ms-auto"
                    style={{ backgroundColor: "#63f74f", color: "white" }}
                  >
                    <i className="fa fa-plus"></i> Add Program
                  </Link>
                </div>
                <div className="card mt-3">
                  <div className="card-header">
                    <h4 className="card-title">This is your Programs</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="basic-datatables"
                        className="display table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Durée</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {programs.length > 0 ? (
                            programs.map((program: Program) => (
                              <tr key={program.id}>
                                <td>{program.nom}</td>
                                <td>{program.description}</td>
                                <td>{program.duree}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleDelete(program.id)}
                                  >
                                    Delete
                                  </button>
                                  <Link to={`/EditProgram/${program.id}`} className="btn btn-modify">
                                    Modify
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4}>No programs found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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

export default Programs;
