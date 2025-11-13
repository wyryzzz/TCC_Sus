import "../Styles/AtividadesRecentes.scss";
import { Clock } from "lucide-react";

export default function AtividadesRecentes() {
  const atividades = [
    { id: 1, paciente: "Ana Souza", horario: "08:30 - Consulta Clínica" },
    { id: 2, paciente: "Carlos Lima", horario: "09:45 - Retorno Cardiologia" },
    { id: 3, paciente: "Julia Mendes", horario: "11:00 - Atendimento Pediatria" },
  ];

  return (
    <div className="atividades-recentes">
      <h3 className="titulo-atividades">Atividades Recentes</h3>
      <div className="lista-atividades">

        {atividades.map((a) => (
          <div className="item-atividade" key={a.id}>
            <Clock size={18} color="#3b82f6" />
            <div className="info-atividade">
              <p className="paciente">{a.paciente}</p>
              <p className="horario">{a.horario}</p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
