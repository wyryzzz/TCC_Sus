import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Users, Calendar, UserCog, Pill, LogOut, BarChart3, Home, Menu, X } from "lucide-react";
import "./Sidebar.scss";

export default function Sidebar({ definirSidebarAberta }) {
  const [colapsado, definirColapsado] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  function alternarMenu() {
    setMenuAberto(!menuAberto);
  }

  useEffect(() => {
    definirSidebarAberta(!colapsado || menuAberto);
  }, [colapsado, menuAberto]);

  return (
    <>
      <button className="botao-hamburguer" onClick={alternarMenu}>
        {menuAberto ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuAberto && <div className="fundo-escuro" onClick={alternarMenu}></div>}

      <div
        className={`menu-lateral ${
          menuAberto ? "menu-mobile-aberto" : ""
        } ${colapsado ? "menu-colapsado" : "menu-aberto"}`}
        onMouseEnter={() => definirColapsado(false)}
        onMouseLeave={() => definirColapsado(true)}
      >
        <div className="area-topo">
          <div className="area-logo">
            <img src="/src/assets/images/logo.png" alt="Logo SUS Digital" />
            {!colapsado && <span>SUS Digital</span>}
          </div>
        </div>

        <nav className="area-navegacao">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <Home size={20} />
            {!colapsado && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/funcionarios"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <Users size={20} />
            {!colapsado && <span>Funcionários</span>}
          </NavLink>

          <NavLink
            to="/consultas"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <BarChart3 size={20} />
            {!colapsado && <span>Consultas</span>}
          </NavLink>

          <NavLink
            to="/pacientes"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <UserCog size={20} />
            {!colapsado && <span>Pacientes</span>}
          </NavLink>

          <NavLink
            to="/medicamentos"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <Pill size={20} />
            {!colapsado && <span>Medicamentos</span>}
          </NavLink>

          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
            onClick={() => setMenuAberto(false)}
          >
            <BarChart3 size={20} />
            {!colapsado && <span>Relatórios</span>}
          </NavLink>
        </nav>

        <div className="rodape-menu">
          <button onClick={sair} className="link-navegacao botao-sair">
            <LogOut size={20} />
            {!colapsado && <span>Sair</span>}
          </button>
        </div>
      </div>
    </>
  );
}
  