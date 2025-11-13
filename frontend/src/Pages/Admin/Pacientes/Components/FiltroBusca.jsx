import { Search } from "lucide-react";
import "../Styles/FiltroBusca.scss"


export default function FiltroBusca({ textoBusca, setTextoBusca }) {
  return (
    <div className="filtros-busca">
      <div className="busca">
        <Search className="icone-busca" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome, CPF, cartão SUS ou email..."
          value={textoBusca}
          onChange={(e) => setTextoBusca(e.target.value)}
        />
      </div>
    </div>
  );
}
