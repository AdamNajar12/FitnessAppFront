import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Main from './Main/main';
import Register from './UserAuthtication/Register';
import Login from './UserAuthtication/login';
import Test from './Test/test';


import ProgramForm from './CoachUI/ProgramInterface/ProgramForm';
import DashboardSlider from './CoachUI/DashboardComponent/DashboradSlider';
import Programs from './CoachUI/ProgramInterface/ShowPrograms';
import EditProgramFormWrapper from './CoachUI/ProgramInterface/EditProgramForm';
import Exercices from './CoachUI/ExercicesInterface/ShowExercices';
import ExerciceForm from './CoachUI/ExercicesInterface/ExerciceForm';
import EditExerciceFormWrapper from './CoachUI/ExercicesInterface/EditExerciceForm';
import Dashboard from './CoachUI/DashboradMainComponent/Dashborad';
import ChartDashboard from './CoachUI/Satistics/chart';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
              <Routes>
               <Route path='/register' element={<Register />} />
               <Route path='/login' element={<Login />} />
               <Route path='/Test' element={<Test/>} />
               <Route path='/Showprogram' element={<Programs/>}/>
               <Route path='/Addprogram' element={<ProgramForm />}/>
               <Route path="/EditProgram/:id" element={<EditProgramFormWrapper />} />
               <Route path="/ShowExercices" element={<Exercices/>} />
               <Route path="/AddExercice" element={<ExerciceForm/>}/>
               <Route path="/EditExercice/:id" element={<EditExerciceFormWrapper />} />
               <Route path="/DashboardCoach" element={<Dashboard/>} />
               <Route path="/chartCoach" element={<ChartDashboard/>} />

      
              </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
