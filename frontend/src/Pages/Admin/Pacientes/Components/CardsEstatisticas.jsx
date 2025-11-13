import { Users, User, Calendar, Shield } from "lucide-react";
import "../Styles/CardsEstatisticas.scss"

export default function CardsEstatisticas({ listaPacientes }) {
  return (
    <div className="cards-estatisticas">
      <div className="card">
        <div className="icone bg-azul">
          <Users size={24} className="text-branco" />
        </div>
        <div className="conteudo">
          <p>Total</p>
          <p className="numero">{listaPacientes.length}</p>
        </div>
      </div>

      <div className="card">
        <div className="icone bg-verde">
          <User size={24} className="text-branco" />
        </div>
        <div className="conteudo">
          <p>Ativos</p>
          <p className="numero">{listaPacientes.filter((p) => p.status === "ativo").length}</p>
        </div>
      </div>

      <div className="card">
        <div className="icone bg-laranja">
          <Calendar size={24} className="text-branco" />
        </div>
        <div className="conteudo">
          <p>Consultas Hoje</p>
          <p className="numero">0</p>
        </div>
      </div>

      <div className="card">
        <div className="icone bg-roxo">
          <Shield size={24} className="text-branco" />
        </div>
        <div className="conteudo">
          <p>Cartões SUS</p>
          <p className="numero">{listaPacientes.length}</p>
        </div>
      </div>
    </div>
  );
}
