import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./Header.scss";

export default function Header() {
  const navigate = useNavigate();
  const [nomeMedico, setNomeMedico] = useState("Médico");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    if (usuario.nome) {
      setNomeMedico(usuario.nome);
    }
  }, []);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <header className="cabecalho-dashboard3">

      <div className="logo-container">
        <img src="src/assets/images/logo.png" alt="Logo SUS" />
      </div>


      <div className="perfil-container">
        <div className="info-perfil">
          <p className="nome-usuario">{nomeMedico}</p>
          <p className="cargo-usuario">Médico</p>
        </div>
        <button onClick={sair} className="botao-sair" title="Sair">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
