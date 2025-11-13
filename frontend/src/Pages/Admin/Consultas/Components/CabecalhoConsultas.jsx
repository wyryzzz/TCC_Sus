import { Plus } from "lucide-react";
import "../Styles/CabecalhoConsultas.scss"
export default function CabecalhoConsultas({ abrirModalCadastrar }) {
  return (
    <div className="cabecalho-consultas">
      <div className="titulo">
        <h1>Agendamento de Consultas</h1>
        <p>Gerencie consultas, agendamentos e histórico de pacientes</p>
      </div>
      <button className="botao-adicionar" onClick={abrirModalCadastrar}>
        <Plus size={20} /> Agendar Consulta
      </button>
    </div>
  );
}
