import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
  const ASSET_PATH = '/assets/';

  return (
    <>
      <header id="header" className="site-header">
        <div className="container header-container">
          <a href="#" className="logo">
            <div className="logo-icon-wrapper">
              <div className="logo-icon-bg"></div>
              <img src={`${ASSET_PATH}1_12.svg`} alt="TechNET logo icon" />
            </div>
            <span className="logo-text">TechNET</span>
          </a>
          <nav className="main-nav">
            <ul>
              <li><a href="#hero">Início</a></li>
              <li><a href="#services">Sobre</a></li>
              <li><a href="#footer">Contato</a></li>
            </ul>
          </nav>
          <a href="#footer" className="btn cta-button">Fale Conosco</a>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <img
          src={`${ASSET_PATH}1_71.svg`}
          alt="background shape"
          className="hero-bg"
        />
        <div className="container hero-container">
          <h1 className="hero-title">
            Transformamos ideias em <span className="highlight">Soluções Digitais</span>
          </h1>
          <p className="hero-subtitle">
            Somos especialistas em desenvolvimento de software, design UX/UI e consultoria tecnológica. 
            Ajudamos empresas a crescer no mundo digital com soluções inovadoras e personalizadas.
          </p>
          <div className="hero-buttons">
            <Link to="/sobre" className="btn btn-primary">Conheça Nossa História</Link>
            <Link to="/contato" className="btn btn-secondary">Solicitar Orçamento</Link>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Nossos Serviços</h2>
          <div className="underline"></div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-bg style-1"></div>
                <img src={`${ASSET_PATH}1_41.svg`} alt="Desenvolvimento Web icon" />
              </div>
              <h3 className="service-title">Desenvolvimento Web</h3>
              <p className="service-description">
                Sites e aplicações web modernas, responsivas e otimizadas para performance.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-bg style-2"></div>
                <img src={`${ASSET_PATH}1_43.svg`} alt="Design UX/UI icon" />
              </div>
              <h3 className="service-title">Design UX/UI</h3>
              <p className="service-description">
                Interfaces intuitivas e experiências digitais que encantam seus usuários.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon-bg style-3"></div>
                <img src={`${ASSET_PATH}1_38.svg`} alt="Consultorias Tech icon" />
              </div>
              <h3 className="service-title">Consultorias Tech</h3>
              <p className="service-description">
                Estratégias tecnológicas personalizadas para acelerar o crescimento do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="partners-section">
        <div className="container">
          <h2 className="section-title">Empresas Parceiras</h2>
          <div className="underline-partners"></div>
          <div className="partners-grid">
            <div className="partner-item">
              <div className="partner-logo">
                <span className="partner-logo-text">TECH</span>
              </div>
              <p className="partner-name">TechCorp</p>
            </div>

            <div className="partner-item">
              <div className="partner-logo">
                <span className="partner-logo-text">INOV</span>
              </div>
              <p className="partner-name">InovaSoft</p>
            </div>

            <div className="partner-item">
              <div className="partner-logo">
                <span className="partner-logo-text">DIGI</span>
              </div>
              <p className="partner-name">DigiSolutions</p>
            </div>

            <div className="partner-item">
              <div className="partner-logo">
                <span className="partner-logo-text cloud">CLOUD</span>
              </div>
              <p className="partner-name">CloudTech</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Pronto para transformar seu negócio?</h2>
          <p className="cta-subtitle">
            Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer.
          </p>
          <Link to="/contato" className="btn btn-light">Começar Agora</Link>
        </div>
      </section>

      <footer id="footer" className="site-footer-section">
        <img
          src={`${ASSET_PATH}1_77.svg`}
          alt="footer background shape"
          className="footer-bg"
        />
        <div className="container footer-container">
          <div className="footer-main">
            <div className="footer-about">
              <a href="#" className="logo footer-logo">
                <div className="logo-icon-wrapper">
                  <div className="logo-icon-bg"></div>
                  <img src={`${ASSET_PATH}1_91.svg`} alt="TechNET logo icon" />
                </div>
                <span className="logo-text">TechNET</span>
              </a>
              <p>Transformando ideias em soluções digitais inovadoras desde 2025.</p>
            </div>

            <div className="footer-links">
              <h4>Serviços</h4>
              <ul>
                <li><a href="#">Desenvolvimento Web</a></li>
                <li><a href="#">Design UX/UI</a></li>
                <li><a href="#">Consultoria Tech</a></li>
                <li><a href="#">E-commerce</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Empresa</h4>
              <ul>
                <li><Link to="/sobre">Sobre Nós</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><a href="#">Carreiras</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Contato</h4>
              <ul>
                <li><a href="mailto:contato@technet.com.br">contato@technet.com.br</a></li>
                <li><a href="tel:+5511983197755">(11) 98319-7755</a></li>
                <li><p>São Paulo, SP</p></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 TechNET. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
