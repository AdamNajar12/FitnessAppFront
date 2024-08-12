import React, { Component } from "react";
import axios from "axios";
import DashboardSlider from "../DashboardComponent/DashboradSlider";
import { Link } from "react-router-dom";
import { Exercice } from "../../Models/Exercice";

type State = {
    exercices: Exercice[];
};

class Exercices extends Component<{}, State> {
  state: State = {
    exercices: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/exercice/");
      console.log("API Response:", response.data);
      const exercices = response.data.results || [];
      console.log("Exercices:", exercices);
      this.setState({ exercices });
    } catch (error) {
      console.error("There was an error fetching the exercises!", error);
      this.setState({ exercices: [] });
    }
  };

  handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/exercice/${id}/`);
      this.setState((prevState) => ({
        exercices: prevState.exercices.filter((exercice) => exercice.id !== id),
      }));
      
    } catch (error) {
      console.error("There was an error deleting the exercise!", error);
    }
  };

  render() {
    const { exercices } = this.state;

    return (
        <DashboardSlider>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header">
                        <h3 className="fw-bold mb-3">Exercises</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center">
                                <Link
                                    to="/AddExercice"
                                    className="btn btn-primary btn-round ms-auto"
                                    style={{ backgroundColor: "#63f74f", color: "white" }}
                                >
                                    <i className="fa fa-plus"></i> Add Exercise
                                </Link>
                            </div>
                            <div className="card mt-3">
                                <div className="card-header">
                                    <h4 className="card-title">Your Exercises</h4>
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
                                                    <th>Type</th>
                                                    <th>Durée</th>
                                                    <th>Repetitions</th>
                                                    <th>Sets</th>
                                                    <th>Program</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {exercices.length > 0 ? (
                                                    exercices.map((exercice: Exercice) => {
                                                        console.log("Exercice:", exercice);
                                                        return (
                                                            <tr key={exercice.id}>
                                                                <td>{exercice.nom}</td>
                                                                <td>{exercice.type}</td>
                                                                <td>{exercice.duree}</td>
                                                                <td>{exercice.repetitions}</td>
                                                                <td>{exercice.sets}</td>
                                                                <td>{exercice.programme ? exercice.programme.nom : 'N/A'}</td> {/* Display program name */}
                                                                <td>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => this.handleDelete(exercice.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <Link to={`/EditExercice/${exercice.id}`} className="btn btn-modify">
                                                                        Modify
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={7}>No exercises found</td>
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

export default Exercices;
