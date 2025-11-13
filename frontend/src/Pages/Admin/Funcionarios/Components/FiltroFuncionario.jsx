import { Search } from "lucide-react";
import "../Styles/FiltroFuncionario.scss"

export default function FiltroFuncionarios({ busca, setBusca, filtro, setFiltro }) {
  return (
    <div className="cartao-filtro">
      <div className="area-filtro">
        <div className="campo-busca">
          <Search size={20} className="icone-busca" />
          <input
            placeholder="Buscar por nome, email ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <div className="campo-filtro">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos os Tipos</option>
            <option value="medico">Médicos</option>
            <option value="enfermagem">Enfermeiros</option>
            <option value="administracao">Administração</option>
          </select>
        </div>
      </div>
    </div>
  );
}
