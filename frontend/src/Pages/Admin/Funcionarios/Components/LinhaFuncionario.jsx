import { Edit, Trash2 } from "lucide-react";

export default function LinhaFuncionario({ funcionario, deletarFuncionario, aoEditar }) {
  return (
    <tr>
      <td>{funcionario.nome}</td>
      <td>{funcionario.tipo}</td>
      <td>{funcionario.email}<br />{funcionario.telefone}</td>
      <td>{funcionario.dataAdmissao}</td>
      <td>{funcionario.salario}</td>
      <td>
        <span className={funcionario.status === "ativo" ? "status-ativo" : "status-inativo"}>
          {funcionario.status === "ativo" ? "Ativo" : "Inativo"}
        </span>
      </td>
      <td className="acoes">
        <button onClick={() => aoEditar(funcionario)} className="editar">
          <Edit size={16} />
        </button>
        <button onClick={() => deletarFuncionario(funcionario.id)} className="deletar">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
