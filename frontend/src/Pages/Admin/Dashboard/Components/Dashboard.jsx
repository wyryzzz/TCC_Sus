import { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";

import CartaoEstatistica from "./CartaoEstatistica";
import AtividadesRecentes from "./AtividadesRecentes";
import GraficoConsultas from "./GraficoConsultas";
import AcoesRapidas from "./AcoesRapidas";

import { Users, Calendar, Pill, Activity } from "lucide-react";

import "../Styles/Dashboard.scss";
import api from "../../../../api";

export default function Dashboard() {
  const [estatisticas, setEstatisticas] = useState({});
  const [dadosGraficos, setDadosGraficos] = useState([]);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [pacientesPorIdade, setPacientesPorIdade] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        let resposta = await api.get("/estatisticas/dashboard");
        setEstatisticas(resposta.data);

        let respMes = await api.get("/estatisticas/consultas/por-mes");
        let dados = (respMes.data).map((item) => ({
          label: item.mes, 
          valor: item.total,
        }));

        setDadosGraficos(dados);

        let respIdade = await api.get("/estatisticas/pacientes/por-idade");
        setPacientesPorIdade(respIdade.data);
      }

      catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    }

    carregar();
  }, []);

  return (
    <div className="painel-geral">
      <Sidebar definirSidebarAberta={setSidebarAberta} />

      <div
        className={`conteudo-principal ${sidebarAberta ? "menu-aberto" : "menu-colapsado"
          }`}
      >
        <DashboardHeader />

        <main className="conteudo-dashboard">
          <div className="boas-vindas">
            <h1>Bem-vindo ao SUS Digital</h1>
            <p>Acompanhe o desempenho do sistema e gerencie suas operações</p>
          </div>

          <div className="grade-estatisticas">
            <CartaoEstatistica
              titulo="Total de Pacientes"
              valor={estatisticas.totalPacientes}
              icone={Users}
              cor="azul"
            />
            <CartaoEstatistica
              titulo="Consultas Hoje"
              valor={estatisticas.consultasHoje}
              icone={Calendar}
              cor="verde"
            />
            <CartaoEstatistica
              titulo="Medicamentos"
              valor={estatisticas.totalMedicamentos}
              icone={Pill}
              cor="roxo"
            />
            <CartaoEstatistica
              titulo="Equipe Ativa"
              valor={estatisticas.funcionariosAtivos}
              icone={Activity}
              cor="laranja"
            />
          </div>

          <div className="secao-graficos">
            <GraficoConsultas pacientesPorIdade={pacientesPorIdade} />
            <div className="atividades">
              <AtividadesRecentes />
            </div>
          </div>

          <AcoesRapidas />
        </main>
      </div>
    </div>
  );
}
