import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement, // Ajoutez cette ligne
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement, 
  Title,
  Tooltip,
  Legend
);

interface ClientsPerMonthData {
  [key: string]: number;
}
interface Client {
  client_name: string;
  program_name: string;
}

const CoachDashboard: React.FC = () => {
  // Mise à jour de l'état pour inclure total_programs
  
  
  const [stats, setStats] = useState<{ 
    affected_clients_percentage: number,
    total_programs: number,
    total_exercices:number,
    total_clients:number,

  }>({ 
    affected_clients_percentage: 0,
    total_programs: 0 ,
    total_exercices:0,
    total_clients:0
  });
  const [clientsData, setClientsData] = useState<ClientsPerMonthData>({});
  const [progressionStats, setProgressionStats] = useState({
    objectifsAtteints: 0,
    enProgression: 0,
    nonAtteints: 0
  });
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/coach-statistics/', {
        withCredentials: true,
      })
      .then(response => {
        setStats(response.data);  // Mettre à jour l'état avec les données de réponse
      })
      .catch(error => console.error('Erreur lors de la récupération des statistiques :', error));
      axios.get<{ clients_per_month: { [key: string]: number } }>('http://127.0.0.1:8000/api/new-clients-per-month/', {
        withCredentials: true,
      })
      .then(response => {
        const data = response.data.clients_per_month;
        console.log('Données des clients par mois:', data);
  
        const formattedData: ClientsPerMonthData = {};
        for (const [dateTime, count] of Object.entries(data)) {
          const month = new Date(dateTime).toISOString().slice(0, 7);
          formattedData[month] = count as number;
        }
        setClientsData(formattedData);
      })
      .catch(error => console.error('Erreur lors de la récupération des données des nouveaux clients :', error));  
      axios.get('http://127.0.0.1:8000/api/client-progression/', {
        withCredentials: true,
      })
      .then(response => {
        const data = response.data.progression_stats;
        setProgressionStats({
          objectifsAtteints: data['Objectifs Atteints'],
          enProgression: data['En Progression'],
          nonAtteints: data['Objectifs Non Atteints']
        });
      })
      .catch(error => console.error('Erreur lors de la récupération des données de progression :', error));
      const fetchClients = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/coach/clients/', {
            withCredentials: true, 
          });
          setClients(response.data.clients);  // Stocker les clients dans l'état
        } catch (error) {
          console.error('Erreur lors de la récupération des clients :', error);
        }
      };
  
      fetchClients();
  }, []);

  const labels = Object.keys(clientsData);
  const dataValues = Object.values(clientsData);

  if (labels.length === 0 || dataValues.length === 0) {
    console.warn('Les données du graphique sont vides.');
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Nouveaux Clients par Mois',
        data: dataValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Graphique des Nouveaux Clients par Mois', // Titre du graphique
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois', // Nom de l'axe X
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de Nouveaux Clients', // Nom de l'axe Y
        },
      },
    },
  };
  const pieData = {
    labels: ['Objectifs Atteints', 'En Progression', 'Objectifs Non Atteints'],
    datasets: [
      {
        label: 'Progression des Clients',
        data: [progressionStats.objectifsAtteints, progressionStats.enProgression, progressionStats.nonAtteints],
        backgroundColor: ['#63f74f', '#f7b63f', '#f76363'], // Couleurs pour chaque segment
        hoverBackgroundColor: ['#5ae045', '#e0a836', '#e05353'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="container">
      <div className="page-inner">
        <div
          className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
        >
          
          <br></br>
        </div>
        <div className="row">
          {/* Carte pour le pourcentage de clients affectés */}
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Clients Affectés</p>
                      <h4 className="card-title">{stats.affected_clients_percentage}%</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nouvelle carte pour le total des programmes */}
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-user-check"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Total Programmes</p>
                      <h4 className="card-title">{stats.total_programs}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-user-check"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Total Exercices</p>
                      <h4 className="card-title">{stats.total_exercices}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-user-check"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Total Clients</p>
                      <h4 className="card-title">{stats.total_clients}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Ajoutez d'autres cartes avec des statistiques ici */}
        </div>
        </div>
        <div className="row">
  <div className="col-md-8"> {/* Ajoutez cette ligne pour ajuster la largeur */}
    <div className="card card-round">
      <div className="card-body">
        <h2>Statistiques des Nouveaux Clients</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  </div>

  <div className="col-md-4"> {/* Changez col-md-8 en col-md-6 pour le pie chart */}
    <div className="card card-round">
      <div className="card-body">
        <h2>Progression des Clients</h2>
        <Pie data={pieData} />
      </div>
    </div>
  </div>
</div>
<div className="row">
      <div className="col-md-4">
        <div className="card card-round">
          <div className="card-body">
            <div className="card-head-row card-tools-still-right">
              <div className="card-title">Participants</div>
              <div className="card-tools">
                <div className="dropdown">
                  <button className="btn btn-icon btn-clean me-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-list py-4">
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <div className="item-list" key={index}>
                    <div className="avatar">
                      <img src="images/client1.png" alt="" className="avatar-img rounded-circle" />
                    </div>
                    <div className="info-user ms-3">
                      <div className="username">{client.client_name}</div>
                      <div className="status">{client.program_name}</div>
                    </div>
                    <button className="btn btn-icon btn-link op-8 me-1">
                      <i className="far fa-envelope"></i>
                    </button>
                    <button className="btn btn-icon btn-link btn-danger op-8">
                      <i className="fas fa-ban"></i>
                    </button>
                  </div>
                ))
              ) : (
                <p>Aucun participant trouvé.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>         
    </div>
  );
};

export default CoachDashboard;
