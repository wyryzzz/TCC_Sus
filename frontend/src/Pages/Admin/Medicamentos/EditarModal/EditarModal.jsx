import "./EditarModal.scss";

export default function EditarModal({
  titulo = "Editar Registro",
  descricao = "Atualize as informações abaixo",
  campos = [],
  valoresIniciais = {},
  onClose,
  onSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div className="editar-modal-overlay">
      <div className="editar-modal">
        <h1>{titulo}</h1>
        <p>{descricao}</p>

        <form className="form-editar" onSubmit={handleSubmit}>
          {campos.map((campo, index) => (
            <div className="form-group" key={index}>
              <label>{campo.label}</label>

              {campo.tipo === "textarea" ? (
                <textarea
                  name={campo.nome}
                  defaultValue={valoresIniciais[campo.nome] || ""}
                  placeholder={campo.placeholder}
                />
              ) : campo.tipo === "select" ? (
                <select
                  name={campo.nome}
                  defaultValue={valoresIniciais[campo.nome] || campo.opcoes?.[0] || ""}
                  required={campo.label?.includes("*")}
                >
                  {campo.opcoes?.map((opcao, i) => (
                    <option key={i} value={opcao}>
                      {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={campo.tipo || "text"}
                  name={campo.nome}
                  defaultValue={valoresIniciais[campo.nome] || ""}
                  placeholder={campo.placeholder}
                  step={campo.step}
                  required={campo.label?.includes("*")}
                />
              )}
            </div>
          ))}

          <div className="form-buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="update">
              {titulo.includes("Cadastrar") ? "Cadastrar" : "Atualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
