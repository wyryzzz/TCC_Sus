import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import "./DashboardHeader.scss";

export default function DashboardHeader() {
  const navigate = useNavigate()

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header className="cabecalho-dashboard">
      <div className="perfil-container">
        <div className="info-perfil">
          <p className="nome-usuario">Admin</p> 
          <p className="cargo-usuario">Administrador</p>
        </div>
        <button onClick={sair} className="botao-sair" title="Sair">
          <LogOut size={20} />
        </button>

      </div>

    </header>
  );
}
