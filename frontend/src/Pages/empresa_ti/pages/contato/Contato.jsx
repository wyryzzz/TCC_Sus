import "./Contato.scss";

function Contato() {
  return (
    <main className="contato">

      {/* HEADER */}
      <section className="banner">
        <h1>Entre em Contato</h1>
        <p>
          Estamos prontos para transformar suas ideias em realidade. Fale conosco sobre o seu próximo projeto.
        </p>
      </section>

      {/* FORM + INFORMAÇÕES */}
      <section className="conteudo">

        {/* FORMULÁRIO */}
        <form className="formulario">
          <h2>Envie sua Mensagem</h2>

          <div className="grupo">
            <input type="text" placeholder="Nome" required />
            <input type="email" placeholder="Email" required />
          </div>

          <div className="grupo">
            <input type="text" placeholder="Telefone" />
            <input type="text" placeholder="Empresa" />
          </div>

          <div className="grupo">
            <input type="text" placeholder="Tipo de Projeto" />
          </div>

          <textarea placeholder="Mensagem" rows="5"></textarea>

          <button type="submit">Enviar Mensagem</button>
        </form>

        {/* INFORMAÇÕES */}
        <div className="info">

          <div className="card">
            <h3>Informações de Contato</h3>
            <ul>
              <li>Email: contato@technet.com.br</li>
              <li>Telefone: (11) 99810-7755</li>
              <li>Endereço: São Paulo, SP</li>
              <li>Horário de Atendimento: 08h às 18h</li>
            </ul>
          </div>

          <div className="card destaque">
            <p>Precisa de uma Resposta Rápida?</p>
            <button>Chamar no WhatsApp</button>
          </div>

        </div>

      </section>

      {/* LOCALIZAÇÃO */}
      <section className="localizacao">
        <h2>Nossa Localização</h2>
        <div className="mapa">
          <p>Av. Paulista, 1000<br />São Paulo, SP - 01310-100</p>
          <span>Mapa interativo será carregado aqui</span>
        </div>
      </section>

    </main>
  );
}

export default Contato;
