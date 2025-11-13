import { Calendar, Clock, User, MapPin } from "lucide-react";
import "../Styles/CartoesEstatisticas.scss"

export default function CartoesEstatisticas({ totalConsultas, hoje, emAndamento, unidadesAtivas}) {
  return (
    <div className="cartoes-estatisticas">
      <div className="cartao azul">
        <Calendar size={24} />
        <div>
          <p>Total de Consultas</p>
          <h4>{totalConsultas}</h4>
        </div>
      </div>
      <div className="cartao verde">
        <Clock size={24} />
        <div>
          <p>Hoje</p>
          <h4>{hoje}</h4>
        </div>
      </div>
      <div className="cartao amarelo">
        <User size={24} />
        <div>
          <p>Em Andamento</p>
          <h4>{emAndamento}</h4>
        </div>
      </div>
      <div className="cartao roxo">
        <MapPin size={24} />
        <div>
          <p>Unidades Ativas</p>
          <h4>{unidadesAtivas}</h4>
        </div>
      </div>
    </div>
  );
}
