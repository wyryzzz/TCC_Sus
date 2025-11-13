import { Plus, UserCog } from "lucide-react";
import "../Styles/CabecalhoSecao.scss"

export default function CabecalhoSecao({ abrirModalCadastrar, abrirModalMedico }) {
  return (
    <div className="cabecalho-secao">
      <div>
        <h1>Gestão de Funcionários</h1>
        <p>Gerencie médicos, enfermeiros e equipe administrativa</p>
      </div>
      <div className="botoes-cabecalho">
        <button className="botao-azul" onClick={abrirModalMedico}>
          <Plus size={20} /> Novo Médico
        </button>
        <button className="botao-verde" onClick={abrirModalCadastrar}>
          <UserCog size={20} /> Novo Funcionário
        </button>
      </div>
    </div>
  );
}
