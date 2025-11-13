import { Users } from "lucide-react";
import "../Styles/EstadoVazio.scss";

export default function EstadoVazio({ busca }) {
  return (
    <div className="estado-vazio">
      <Users size={48} />
      <h3>Nenhum funcionário encontrado</h3>
      <p>{busca ? "Tente ajustar os filtros de busca." : "Comece adicionando um novo funcionário."}</p>
    </div>
  );
}
