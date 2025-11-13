import { Pill, Edit, Trash2 } from "lucide-react";
import "../Styles/TabelaMedicamentos.scss";

export default function TabelaMedicamentos({ medicamentos, loading, error, deletarMedicamento, editarMedicamento }) {
  if (loading)
    return <div className="estado-carregando">Carregando medicamentos...</div>;
  if (error) return <div className="estado-erro">{error}</div>;

  return (
    <div className="tabela-container">
      <table className="tabela-medicamentos">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Dosagem/Forma</th>
            <th>Estoque</th>
            <th>Fornecedor</th>
            <th>Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.length ? (
            medicamentos.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="celula-medicamento">
                    <Pill size={16} className="icone-medicamento" />
                    <div>
                      <div className="nome-medicamento">{m.nome}</div>
                      <div className="principio-ativo">{m.principio_ativo}</div>
                    </div>
                  </div>
                </td>
                <td>{m.dosagem_forma}</td>
                <td>{m.estoque}</td>
                <td>{m.fornecedor}</td>
                <td>{m.validade}</td>
                <td className="acoes">
                  <button onClick={() => editarMedicamento(m)}>
                    <Edit size={16} />
                  </button>

                  <button onClick={() => deletarMedicamento(m.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                Nenhum medicamento encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
