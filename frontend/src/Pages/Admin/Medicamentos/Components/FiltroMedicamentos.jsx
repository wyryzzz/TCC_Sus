import { Search } from "lucide-react";

import "../Styles/FiltroMedicamentos.scss"

export default function FiltrosMedicamentos({ busca, setBusca }) {
    return (
        <div className="filtros-medicamentos">
            
            <div className="busca">
                <Search className="icone-busca" size={20} />
                <input type="text" placeholder="Buscar por nome ou princípio ativo..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div> 
            
        </div>
    );
}
