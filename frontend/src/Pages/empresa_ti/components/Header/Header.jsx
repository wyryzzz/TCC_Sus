import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo">
        <i className="fas fa-building"></i> TechNET
      </div>
      <nav className="header-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>
          <i className="fas fa-info-circle"></i> Sobre
        </Link>
        <Link to="/contato" className={location.pathname === '/contato' ? 'active' : ''}>
          <i className="fas fa-envelope"></i> Contato
        </Link>
      </nav>
    </header>
  );
}

export default Header;