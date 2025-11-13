import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Clock, Heart, Users, Star } from 'lucide-react';
import "./LandingPage.scss";

export default function PaginaLanding() {
  return (
    <div className="pagina-landing">
      <header className="cabecalho">
        <div className="logo">
          <img src="src/assets/images/logo.png" alt="Logo SUS Digital" />
          <span className="logo-texto">SUS Digital</span>
        </div>
        <nav className="botoes-navegacao">
          <Link to="/login">
            <button className="botao-secundario">Entrar</button>
          </Link>
          <Link to="/cadastro">
            <button className="botao-principal">Cadastre-se</button>
          </Link>
        </nav>
      </header>

      <section className="secao-hero">
        <div className="conteudo-hero">
          <div className="texto-hero">
            <h1>
              O Futuro da <span className="destaque">Saúde Digital</span>
            </h1>
            <p className="subtitulo-hero">
              Revolucionando o atendimento nas UBS com tecnologia de ponta e design centrado no usuário para um Brasil mais saudável.
            </p>
            <div className="botoes-hero">
              <Link to="/cadastro">
                <button className="botao-cta">
                  Começar Agora
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/login">
                <button className="botao-secundario-hero">
                  Acessar Sistema
                </button>
              </Link>
            </div>

          </div>

        </div>
      </section>

      <section className="secao-funcionalidades">
        <div className="cabecalho-secao">
          <h2>Funcionalidades Principais</h2>
          <p>Tudo que você precisa para gerenciar sua saúde em um só lugar</p>
        </div>
        <div className="grade-funcionalidades">
          <div className="funcionalidade">
            <div className="icone-wrapper">
              <Clock className="icone" />
            </div>
            <h3>Consultas Agendadas</h3>
            <p>Visualize e gerencie todas as suas consultas futuras de forma simples e intuitiva.</p>
          </div>
          <div className="funcionalidade">
            <div className="icone-wrapper">
              <Users className="icone" />
            </div>
            <h3>Histórico Completo</h3>
            <p>Tenha acesso detalhado a todo seu histórico de consultas e tratamentos.</p>
          </div>
          <div className="funcionalidade">
            <div className="icone-wrapper">
              <Shield className="icone" />
            </div>
            <h3>Prontuário Digital</h3>
            <p>Consulte exames, diagnósticos e relatórios médicos de forma segura e organizada.</p>
          </div>
          <div className="funcionalidade">
            <div className="icone-wrapper">
              <Heart className="icone" />
            </div>
            <h3>Perfil Completo</h3>
            <p>Mantenha seus dados cadastrais e informações pessoais sempre atualizados.</p>
          </div>
        </div>
      </section>

      <section className="secao-como-funciona">
        <div className="cabecalho-secao">
          <h2>Como Funciona</h2>
          <p>Três passos simples para começar a usar</p>
        </div>
        <div className="fluxo-passo">
          <div className="passo">
            <div className="numero">1</div>
            <h4>Crie sua Conta</h4>
            <p>Cadastre-se gratuitamente em poucos segundos com seus dados pessoais.</p>
          </div>
          <div className="passo">
            <div className="numero">2</div>
            <h4>Acesse o Sistema</h4>
            <p>Faça login e visualize seu painel personalizado com todas as informações.</p>
          </div>
          <div className="passo">
            <div className="numero">3</div>
            <h4>Gerencie sua Saúde</h4>
            <p>Acompanhe consultas, histórico médico e mantenha tudo organizado.</p>
          </div>
        </div>
      </section>

      <section className="secao-depoimentos">
        <div className="cabecalho-secao">
          <h2>O Que Dizem Nossos Usuários</h2>
          <p>Depoimentos reais de quem já usa o sistema</p>
        </div>
        <div className="grade-depoimentos">
          <div className="depoimento">
            <div className="estrelas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="estrela" />
              ))}
            </div>
            <p className="texto-depoimento">
              "Agora consigo acompanhar minhas consultas e histórico de forma clara e segura. Sistema muito intuitivo!"
            </p>
            <div className="autor-depoimento">
              <div className="avatar">J</div>
              <div>
                <span className="nome">João Silva</span>
                <span className="cargo">Paciente</span>
              </div>
            </div>
          </div>
          <div className="depoimento">
            <div className="estrelas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="estrela" />
              ))}
            </div>
            <p className="texto-depoimento">
              "Meu prontuário está sempre acessível e organizado. Facilita muito o acompanhamento da minha saúde."
            </p>
            <div className="autor-depoimento">
              <div className="avatar">M</div>
              <div>
                <span className="nome">Maria Santos</span>
                <span className="cargo">Paciente</span>
              </div>
            </div>
          </div>
          <div className="depoimento">
            <div className="estrelas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="estrela" />
              ))}
            </div>
            <p className="texto-depoimento">
              "O sistema me ajuda a entender melhor meu histórico de saúde. Interface moderna e fácil de usar."
            </p>
            <div className="autor-depoimento">
              <div className="avatar">A</div>
              <div>
                <span className="nome">Ana Rodrigues</span>
                <span className="cargo">Paciente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao-cta">
        <div className="conteudo-cta">
          <h2>Pronto para Começar?</h2>
          <p>Crie sua conta gratuitamente e tenha acesso a todas as funcionalidades</p>
          <Link to="/cadastro">
            <button className="botao-cta-grande">
              Criar Conta Gratuita
              <ArrowRight size={24} />
            </button>
          </Link>
        </div>
      </section>

      <footer className="rodape">
        <div className="conteudo-rodape">
          <div className="info-rodape">
            <img src="src/assets/images/logo.png" alt="Logo SUS Digital" className="logo-rodape" />
            <p>Sistema de Gestão de Saúde Digital</p>
          </div>
          <div className="links-rodape">
            <Link to="/login" className="link-rodape">
              Acesso Administrativo
            </Link>
            <Link to="/cadastro" className="link-rodape">
              Criar Conta
            </Link>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 SUS Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
