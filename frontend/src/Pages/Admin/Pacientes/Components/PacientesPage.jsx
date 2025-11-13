import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../../../api";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";

import HeaderPacientes from "./HeaderPacientes";
import CardsEstatisticas from "./CardsEstatisticas";
import FiltroBusca from "./FiltroBusca";
import TabelaPacientes from "./TabelaPacientes";
import CadastrarPacienteModal from "../EditarModal/CadastrarPacienteModal";

import "../Styles/PacientesPage.scss";

export default function PacientesPage() {
  const [textoBusca, setTextoBusca] = useState("");
  const [listaPacientes, setListaPacientes] = useState([]);
  const [mensagemErro, setMensagemErro] = useState(null);
  const [sidebarEstaAberta, setSidebarEstaAberta] = useState(false);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);

  async function buscarPacientes() {
    try {
      const resposta = await api.get("/pacientes");
      setListaPacientes(resposta.data);
      setMensagemErro(null);
    } catch {
      setMensagemErro("Erro ao carregar a lista de pacientes.");
    }
  }

  async function removerPaciente(idPaciente) {
    if (!window.confirm("Tem certeza que deseja deletar este paciente?")) return;
    try {
      await api.delete(`/pacientes/${idPaciente}`);
      toast.success("Paciente deletado com sucesso!");
      buscarPacientes();
    } catch (erro) {
      console.error(erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao deletar paciente.";
      toast.error(mensagem);
    }
  }

  useEffect(() => {
    buscarPacientes();
  }, []);

  const pacientesFiltrados = listaPacientes.filter((paciente) => {
    const termo = textoBusca.toLowerCase();
    return (
      termo === "" ||
      paciente.nome.toLowerCase().includes(termo) ||
      paciente.cpf.toLowerCase().includes(termo) ||
      paciente.cartao_sus.toLowerCase().includes(termo) ||
      paciente.email.toLowerCase().includes(termo)
    );
  });

  return (
<div className={`pagina-pacientes ${sidebarEstaAberta ? "sidebar-aberta" : "sidebar-colapsada"}`}>
  <Sidebar definirSidebarAberta={setSidebarEstaAberta} />

  <div className="conteudo-principal">
    <DashboardHeader />

    <main>
      <HeaderPacientes abrirModalCadastrar={() => setModalCadastrarAberto(true)} />

      <FiltroBusca textoBusca={textoBusca} setTextoBusca={setTextoBusca} />
      <TabelaPacientes
        pacientes={pacientesFiltrados}
        mensagemErro={mensagemErro}
        buscarPacientes={buscarPacientes}
        removerPaciente={removerPaciente}
        textoBusca={textoBusca}
      />
    </main>
  </div>

  {modalCadastrarAberto && (
    <CadastrarPacienteModal
      onClose={() => setModalCadastrarAberto(false)}
      onCadastrado={buscarPacientes}
    />
  )}
</div>

  );
}
