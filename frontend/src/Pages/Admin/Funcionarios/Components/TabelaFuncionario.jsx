import LinhaFuncionario from "./LinhaFuncionario";
import "../Styles/TabelaFuncionario.scss"

export default function TabelaFuncionarios({ funcionarios, deletarFuncionario, aoEditar }) {
  return (
    <div className="cartao-tabela">
      <div className="tabela-container">
        <table className="tabela-funcionarios">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Tipo/Especialidade</th>
              <th>Contato</th>
              <th>Admissão</th>
              <th>Salário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <LinhaFuncionario 
                key={f.id} 
                funcionario={f} 
                deletarFuncionario={deletarFuncionario}
                aoEditar={aoEditar}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
