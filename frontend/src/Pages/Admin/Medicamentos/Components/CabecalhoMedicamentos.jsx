import { Plus } from "lucide-react";
import "../Styles/CabecalhoMedicamentos.scss";

export default function CabecalhoMedicamentos({ abrirModalCadastrar }) {
    return (<div className="cabecalho-medicamentos">
        <div>
            <h1>Gestão de Medicamentos</h1>
            <p>Gerencie medicamentos, estoque e fornecedores do sistema</p>
        </div> <button className="botao-novo" onClick={abrirModalCadastrar}>
            <Plus size={20} /> Novo Medicamento </button>
    </div>
    );
}
