import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";

import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";
import api from "../../../../api";

import GraficoConsultas from "./GraficoConsultas";
import GraficoEspecialidades from "./GraficoEspecialidades";
import GraficoMedicamentos from "./GraficoMedicamentos";
import GraficoPacientes from "./GraficoPacientes";

import "../Styles/RelatoriosPage.scss";

export default function RelatoriosPage() {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [consultasPorMes, setConsultasPorMes] = useState([]);
  const [especialidadesData, setEspecialidadesData] = useState([]);
  const [medicamentosConsumo, setMedicamentosConsumo] = useState([]);
  const [pacientesPorIdade, setPacientesPorIdade] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const cores = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"];

      const respMes = await api.get("/estatisticas/consultas/por-mes");
      const respEsp = await api.get("/estatisticas/funcionarios/especialidades");
      const respMed = await api.get("/estatisticas/medicamentos/consumo");
      const respIdade = await api.get("/estatisticas/pacientes/por-idade");

      setConsultasPorMes(respMes.data.map(item => ({
        mes: item.mes,
        consultas: item.consultas,
        pacientes: item.pacientes
      })));

      setEspecialidadesData(respEsp.data.map((item, idx) => ({
        name: item.nome || item.especialidade,
        value: item.valor || item.total,
        color: cores[idx % cores.length]
      })));

      setMedicamentosConsumo(respMed.data.map(item => ({
        medicamento: item.nome || item.medicamento,
        consumo: item.consumo,
        estoque: item.estoque
      })));

      setPacientesPorIdade(respIdade.data.map(item => ({
        faixa: item.faixa || item.faixa_etaria,
        quantidade: item.quantidade
      })));
    }

    carregarDados();
  }, []);

  function exportarPDF() {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Relatório SUS Digital", 14, 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, 30);

    autoTable(pdf, {
      startY: 45,
      head: [["Categoria", "Itens"]],
      body: [
        ["Consultas por Mês", consultasPorMes.length],
        ["Especialidades", especialidadesData.length],
        ["Medicamentos", medicamentosConsumo.length],
        ["Faixas Etárias", pacientesPorIdade.length]
      ],
      theme: "grid"
    });

    pdf.save("relatorio-sus-digital.pdf");
  }

  return (
    <div className={`pagina-relatorios ${sidebarAberta ? "sidebar-aberta" : "sidebar-colapsada"}`}>
      <Sidebar definirSidebarAberta={setSidebarAberta} />

      <div className="conteudo-principal">
        <DashboardHeader />

        <main className="conteudo-relatorios">
          <div className="cabecalho-relatorios">
            <div className="titulo-relatorios">
              <h1>Relatórios e Análises</h1>
              <p>Análise de dados e métricas do sistema</p>
            </div>
            <button className="botao-primario" onClick={exportarPDF}>
              <Download size={20} /> Exportar PDF
            </button>
          </div>

          <div className="graficos-relatorios">
            <GraficoConsultas data={consultasPorMes} />
            <GraficoEspecialidades data={especialidadesData} />
          </div>

          <div className="graficos-relatorios-adicionais">
            <GraficoMedicamentos data={medicamentosConsumo} />
            <GraficoPacientes data={pacientesPorIdade} />
          </div>
        </main>
      </div>
    </div>
  );
}
