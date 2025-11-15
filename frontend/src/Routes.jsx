import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Pages/Admin/Dashboard/Components/Dashboard";
import FuncionariosPage from "./Pages/Admin/Funcionarios/Components/FuncionarioPage";
import PacientesPage from "./Pages/Admin/Pacientes/Components/PacientesPage";
import RelatoriosPage from "./Pages/Admin/Relatorios/Components/RelatoriosPage";
import MedicamentosPage from "./Pages/Admin/Medicamentos/Components/MedicamentosPage";
import LoginPage from "./Pages/Login/LoginPage";
import CadastroPage from "./Pages/Cadastro/CadastroPage";
import CadastroAdminPage from "./Pages/Admin/Cadastro/CadastroAdminPage";
import RotaProtegida from "./RotaProtegida";
import PacientesPag from "./Pages/Pacientes/Pacentes";
import ConsultasPage from "./Pages/Admin/Consultas/Components/App";
import MedicosPage from "./Pages/Medicos/Medicos";
import PaginaLanding from "./Pages/Landing/LandingPage";

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {
          <PaginaLanding />
        } />

        <Route path="/medicospage" element={<MedicosPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/cadastro" element={<CadastroPage />} />

        <Route path="/PacientesPage" element={
          <RotaProtegida >

            <PacientesPag />
          </RotaProtegida>} />

        <Route path="/dashboard" element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        } />

        <Route path="/funcionarios" element={
          <RotaProtegida>
            <FuncionariosPage />
          </RotaProtegida>
        } />

        <Route path="/pacientes" element={
          <RotaProtegida>
            <PacientesPage />
          </RotaProtegida>
        } />

        <Route path="/medicamentos" element={
          <RotaProtegida>
            <MedicamentosPage />
          </RotaProtegida>
        } />

        <Route path="/relatorios" element={
          <RotaProtegida>
            <RelatoriosPage />
          </RotaProtegida>
        } />

        <Route path="/consultas" element={
          <RotaProtegida>
            <ConsultasPage />
          </RotaProtegida>
        } />

        <Route path="/admin/cadastro" element={
          <RotaProtegida>
            <CadastroAdminPage />
          </RotaProtegida>
        } />


      </Routes>
    </BrowserRouter>
  );
}
