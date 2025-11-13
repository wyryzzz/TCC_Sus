import { useState } from "react";
import { Users, Edit, Trash2 } from "lucide-react";
import EditarPacienteModal from "../EditarModal/EditarPacientesModal";
import "../Styles/TabelaPacientes.scss";

export default function TabelaPacientes({ pacientes, mensagemErro, buscarPacientes, removerPaciente, textoBusca }) {
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  if (mensagemErro) {
    return (
      <div className="estado-erro">
        {mensagemErro}{" "}
        <button onClick={buscarPacientes}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="tabela-pacientes">
      {pacientes.length === 0 ? (
        <div className="vazio">
          <Users size={48} />
          <h3>Nenhum paciente encontrado</h3>
          <p>{textoBusca ? "Tente outro termo de busca." : "Comece adicionando um novo paciente."}</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>CPF / SUS</th>
                <th>Contato</th>
                <th>Informações Médicas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.nome}</td>
                  <td>{paciente.cpf} <br /> {paciente.cartao_sus}</td>
                  <td>{paciente.email}</td>
                  <td>{paciente.tipo_sanguineo}</td>
                  <td>
                    <span className={paciente.status === "ativo" ? "status-ativo" : "status-inativo"}>
                      {paciente.status === "ativo" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="acoes">
                    <button className="editar" onClick={() => setPacienteSelecionado(paciente)}>
                      <Edit size={16} />
                    </button>
                    <button className="deletar" onClick={() => removerPaciente(paciente.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pacienteSelecionado && (
            <EditarPacienteModal
              paciente={pacienteSelecionado}
              onClose={() => setPacienteSelecionado(null)}
              onAtualizado={buscarPacientes}
            />
          )}
        </>
      )}
    </div>
  );
}
