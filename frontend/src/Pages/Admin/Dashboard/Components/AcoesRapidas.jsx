import "../Styles/AcoesRapidas.scss";
import { Users, Calendar, Pill, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AcoesRapidas() {
  const navigate = useNavigate();

  return (
    <div className="acoes-rapidas">
      <div className="botao-acao azul" onClick={() => navigate("/pacientes")} style={{ cursor: "pointer" }}>
        <div className="icone"><Users size={20} /></div>
        <div>
          <h3>Novo Paciente</h3>
          <p>Cadastrar um novo paciente</p>
        </div>
      </div>

      <div className="botao-acao verde" onClick={() => navigate("/consultas")} style={{ cursor: "pointer" }}>
        <div className="icone"><Calendar size={20} /></div>
        <div>
          <h3>Nova Consulta</h3>
          <p>Agendar uma nova consulta</p>
        </div>
      </div>

      <div className="botao-acao roxo" onClick={() => navigate("/medicamentos")} style={{ cursor: "pointer" }}>
        <div className="icone"><Pill size={20} /></div>
        <div>
          <h3>Controle de Medicamentos</h3>
          <p>Gerenciar estoque</p>
        </div>
      </div>

      <div className="botao-acao azul" onClick={() => navigate("/relatorios")} style={{ cursor: "pointer" }}>
        <div className="icone"><ClipboardList size={20} /></div>
        <div>
          <h3>Relatórios</h3>
          <p>Visualizar relatórios do sistema</p>
        </div>
      </div>
    </div>
  );
}
