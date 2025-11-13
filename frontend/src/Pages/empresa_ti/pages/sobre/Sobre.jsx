import React from 'react';
import './Sobre.scss';

function Sobre() {
  const ASSET_PATH = '/assets/';

  return (
    <>
      <header id="header" className="header-section">
        <div className="container header-container">
          <a href="#" className="logo">
            {/*merged image*/}
            <div className="logo-icon-wrapper">
              <div className="logo-bg"></div>
              <img src={`${ASSET_PATH}1_101.svg`} alt="TechNET logo icon" className="logo-icon" />
            </div>
            <span className="logo-text">TechNET</span>
          </a>
          <nav className="main-nav">
            <ul>
              <li><a href="#hero">Inicio</a></li>
              <li><a href="#history">Sobre</a></li>
              <li><a href="#footer">Contato</a></li>
            </ul>
          </nav>
          <a href="#footer" className="cta-button">Fale Conosco</a>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <img src={`${ASSET_PATH}1_203.svg`} alt="background graphic" className="hero-bg" />
        <div className="container hero-content">
          <h1 className="hero-title">Sobre a TechNET</h1>
          <p className="hero-subtitle">Conheça nossa história, valores e a equipe apaixonada por tecnologia que está transformando o futuro digital.</p>
        </div>
      </section>

      <section id="history" className="history-section">
        <div className="container history-container">
          <div className="history-text-content">
            <h2 className="history-title">Nossa História</h2>
            <p>A TechFlow nasceu em 2020 com o sonho de democratizar a tecnologia e tornar soluções digitais acessíveis para empresas de todos os tamanhos. Fundada por um grupo de desenvolvedores apaixonados, começamos em uma pequena sala compartilhada em São Paulo.</p>
            <p>Desde então, crescemos exponencialmente, atendendo mais de 200 clientes e desenvolvendo projetos que impactaram milhares de usuários. Nossa jornada é marcada pela inovação constante e pelo compromisso com a excelência.</p>
            <p>Hoje, somos reconhecidos como uma das principais empresas de tecnologia do país, mas mantemos nossos valores originais: proximidade com o cliente, qualidade técnica e paixão pelo que fazemos.</p>
          </div>
          <div className="history-stats-card">
            <div className="stat-item">
              <span className="stat-number stat-blue">200+</span>
              <span className="stat-label">Projetos Entregues</span>
            </div>
            <div className="stat-item">
              <span className="stat-number stat-purple">2</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-item">
              <span className="stat-number stat-green">15</span>
              <span className="stat-label">Colaboradores</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="pillars-section">
        <div className="container pillars-container">
          <h2 className="pillars-title">Nossos Pilares</h2>
          <div className="pillars-grid">
            <div className="pillar-card">
              {/*merged image*/}
              <div className="pillar-icon-wrapper">
                <div className="pillar-icon-bg" style={{ backgroundColor: 'rgba(55, 152, 243, 0.54)' }}></div>
                <img src={`${ASSET_PATH}1_155.svg`} alt="Missão icon" className="pillar-icon" />
              </div>
              <h3 className="pillar-card-title">Missão</h3>
              <p className="pillar-card-text">Transformar ideias em soluções digitais inovadoras, ajudando empresas a crescer e se destacar no mercado através da tecnologia de ponta e atendimento personalizado</p>
            </div>
            <div className="pillar-card">
              {/*merged image*/}
              <div className="pillar-icon-wrapper">
                <div className="pillar-icon-bg" style={{ backgroundColor: 'rgba(190, 185, 250, 0.46)' }}></div>
                <img src={`${ASSET_PATH}1_148.svg`} alt="Visão icon" className="pillar-icon" />
              </div>
              <h3 className="pillar-card-title">Visão</h3>
              <p className="pillar-card-text">Ser reconhecida como a principal referência em soluções digitais no Brasil, liderando a transformação tecnológica e inspirando outras empresas a inovar.</p>
            </div>
            <div className="pillar-card">
              {/*merged image*/}
              <div className="pillar-icon-wrapper">
                <div className="pillar-icon-bg" style={{ backgroundColor: 'rgba(76, 177, 95, 0.28)' }}></div>
                <img src={`${ASSET_PATH}1_172.svg`} alt="Valores icon" className="pillar-icon" />
              </div>
              <h3 className="pillar-card-title">Valores</h3>
              <p className="pillar-card-text">Inovação, transparência, excelência técnica, colaboração em equipe e compromisso com o sucesso dos nossos clientes são os valores que guiam cada decisão.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="values-section">
        <div className="container values-container">
          <h2 className="values-title">Nossos Valores em Detalhes</h2>
          <div className="values-grid">
            <div className="value-item">
              {/*merged image*/}
              <div className="value-icon-wrapper">
                <div className="value-icon-bg" style={{ backgroundColor: 'rgba(55, 152, 243, 0.32)' }}></div>
                <img src={`${ASSET_PATH}1_182.svg`} alt="Inovação icon" className="value-icon" />
              </div>
              <div className="value-text">
                <h3>Inovação</h3>
                <p>Buscamos constantemente novas tecnologias e metodologias para entregar soluções cada vez mais eficientes.</p>
              </div>
            </div>
            <div className="value-item">
              {/*merged image*/}
              <div className="value-icon-wrapper">
                <div className="value-icon-bg" style={{ backgroundColor: 'rgba(76, 177, 95, 0.28)' }}></div>
                <img src={`${ASSET_PATH}1_170.svg`} alt="Transparência icon" className="value-icon" />
              </div>
              <div className="value-text">
                <h3>Transparência</h3>
                <p>Mantemos uma comunicação aberta e honesta com nossos clientes, fornecedores e equipe.</p>
              </div>
            </div>
            <div className="value-item">
              {/*merged image*/}
              <div className="value-icon-wrapper">
                <div className="value-icon-bg" style={{ backgroundColor: 'rgba(190, 185, 250, 0.46)' }}></div>
                <img src={`${ASSET_PATH}1_175.svg`} alt="Excelência icon" className="value-icon" />
              </div>
              <div className="value-text">
                <h3>Excelência</h3>
                <p>Comprometemo-nos com a mais alta qualidade em cada linha de código e pixel de design.</p>
              </div>
            </div>
            <div className="value-item">
              {/*merged image*/}
              <div className="value-icon-wrapper">
                <div className="value-icon-bg" style={{ backgroundColor: 'rgba(245, 152, 85, 0.22)' }}></div>
                <img src={`${ASSET_PATH}1_165.svg`} alt="Colaboração icon" className="value-icon" />
              </div>
              <div className="value-text">
                <h3>Colaboração</h3>
                <p>Trabalhamos em equipe para alcançar objetivos comuns e compartilhar conhecimentos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="container team-container">
          <h2 className="team-title">Nossa Equipe</h2>
          <div className="team-grid">
            <div className="team-card">
              {/*merged image*/}
              <div className="avatar-wrapper" style={{ backgroundColor: 'rgba(55, 152, 243, 0.32)' }}>
                <span className="avatar-initials">GN</span>
              </div>
              <h3 className="member-name">Guilherme Neto</h3>
              <p className="member-role">CEO & Fundador</p>
              <p className="member-desc">Desenvolvedor Full Stack Sênior e Web Designer</p>
            </div>
            <div className="team-card">
              {/*merged image*/}
              <div className="avatar-wrapper" style={{ backgroundColor: 'rgba(243, 55, 55, 0.32)' }}>
                <span className="avatar-initials">AN</span>
              </div>
              <h3 className="member-name">Ana Clara</h3>
              <p className="member-role">Desenvolvedor</p>
              <p className="member-desc">Desenvolvedor Front-end e Mobile, 10+ de experiência</p>
            </div>
            <div className="team-card">
              {/*merged image*/}
              <div className="avatar-wrapper" style={{ backgroundColor: 'rgba(245, 152, 85, 0.72)' }}>
                <span className="avatar-initials">LP</span>
              </div>
              <h3 className="member-name">Lucas Pereira</h3>
              <p className="member-role">Sócio</p>
              <p className="member-desc">Desenvolvedor Web e Agente de Marketing</p>
            </div>
            <div className="team-card team-card-single">
              {/*merged image*/}
              <div className="avatar-wrapper" style={{ backgroundColor: 'rgba(102, 55, 243, 0.32)' }}>
                <span className="avatar-initials">LZ</span>
              </div>
              <h3 className="member-name">Leticia Zeuli</h3>
              <p className="member-role">Agente de IA</p>
              <p className="member-desc">Especialista em React, Node.js e arquiteturas escaláveis.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer-section">
        <div className="container footer-container">
          <div className="footer-brand">
            <a href="#" className="logo">
              {/*merged image*/}
              <div className="logo-icon-wrapper">
                <div className="logo-bg"></div>
                <img src={`${ASSET_PATH}1_223.svg`} alt="TechNET logo icon" className="logo-icon footer-logo-icon" />
              </div>
              <span className="logo-text footer-logo-text">TechNET</span>
            </a>
            <p className="footer-tagline">Transformando ideias em soluções digitais inovadoras desde 2025.</p>
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
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:contato@techflow.com.br">contato@techflow.com.br</a></li>
              <li><a href="tel:+11983197755">(11) 98319-7755</a></li>
              <li><p>São Paulo, SP</p></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 TechNET. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Sobre;
