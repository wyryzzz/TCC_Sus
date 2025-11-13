import "../Styles/CartaoEstatistica.scss";

export default function CartaoEstatistica({ titulo, valor, icone: Icone, cor }) {
  return (
    <div className="cartao-estatistica">
      <div className="conteudo-cartao">
        <div>
          <p className="titulo-cartao">{titulo}</p>
          <p className="valor-cartao">{valor ?? "—"}</p>
        </div>

        <div className={`icone-cartao ${cor}`}>
          <Icone className="icone" size={24} />
        </div>
      </div>
    </div>
  );
}
