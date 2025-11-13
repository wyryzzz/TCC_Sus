import { Search, Filter } from "lucide-react";
import "../Styles/FiltrosConsultas.scss";

export default function FiltrosConsultas({ busca, setBusca, statusFiltro, setStatusFiltro }) {
  return (
    <div className="filtros-consultas">
      <div className="busca">
        <Search className="icone-busca" size={20} />
        <input
          type="text"
          placeholder="Buscar por paciente ou médico..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="filtro-status">
        <Filter className="icone-filtro" size={18} />
        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
        >
          <option value="todos">Todos os Status</option>
          <option value="agendada">Agendadas</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluida">Concluídas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>
    </div>
  );
}
