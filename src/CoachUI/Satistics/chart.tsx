import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ClientsPerMonthData {
  [key: string]: number;
}

const ChartDashboard: React.FC = () => {
  const [stats, setStats] = useState<{ 
    affected_clients_percentage: number, 
    total_programs: number, 
    total_exercices: number, 
    clients_in_programs: number 
  }>({
    affected_clients_percentage: 0,
    total_programs: 0,
    total_exercices: 0,
    clients_in_programs: 0,
  });

  const [clientsData, setClientsData] = useState<ClientsPerMonthData>({});

  useEffect(() => {
    

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
        text: 'Nouveaux Clients par Mois',
      },
    },
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-3">Dashboard</h3>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col">
            <h2>Statistiques des Nouveaux Clients</h2>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
