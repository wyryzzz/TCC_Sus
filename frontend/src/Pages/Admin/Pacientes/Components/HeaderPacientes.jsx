import { Plus } from "lucide-react";
import "../Styles/HeaderPacientes.scss"


export default function HeaderPacientes({ abrirModalCadastrar }) {
  return (
    <main>
      <div className="cabecalho">
        <div>
          <h1>Gestão de Pacientes</h1>
          <p>Cadastro e gerenciamento de pacientes do SUS</p>
        </div>
        <button className="botao-novo" onClick={abrirModalCadastrar}>
          <Plus size={20} /> Novo Paciente
        </button>
      </div>
    </main>
  );
}
