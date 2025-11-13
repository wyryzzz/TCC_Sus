import { useState, useEffect } from "react";
import { toast } from "sonner";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";
import api from "../../../../api";

import CabecalhoSecao from "./CabecalhoSecao";
import FiltroFuncionarios from "./FiltroFuncionario";
import TabelaFuncionarios from "./TabelaFuncionario";
import EstadoVazio from "./EstadoVazio";
import CadastrarFuncionarioModal from "../EditarModal/CadastrarFuncionarioModal";
import EditarFuncionarioModal from "../EditarModal/EditarFuncionariosModal";
import CadastrarMedicoModal from "../EditarModal/CadastrarMedicoModal";

import "../Styles/FuncionariosPage.scss"

export default function FuncionariosPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [modalMedicoAberto, setModalMedicoAberto] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  const carregarFuncionarios = async () => {
    setLoading(true);
    try {
      const res = await api.get("/funcionarios");
      setFuncionarios(res.data.resposta.map(f => ({
        id: f.id,
        nome: f.nome || "",
        cpf: f.cpf || "",
        email: f.email || "",
        telefone: f.telefone || "",
        endereco: f.endereco || "-",
        departamento: f.departamento || "",
        tipo: f.departamento?.toLowerCase() || "desconhecido",
        cargo: f.cargo || "",
        dataAdmissao: f.data_admissao ? new Date(f.data_admissao).toLocaleDateString("pt-BR") : "-",
        data_admissao: f.data_admissao || "",
        salario: f.salario ? `R$ ${parseFloat(f.salario).toFixed(2)}` : "R$ 0,00",
        status: f.funcionario_ativo === 1 ? "ativo" : "inativo",
      })));
    } 
    
    catch {
      alert("Erro ao carregar funcionários");
    } 
    
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function deletarFuncionario(id) {
    if (!window.confirm("Tem certeza que deseja deletar este funcionário?")) return;
    try {
      await api.delete(`/funcionarios/${id}`);
      toast.success("Funcionário deletado com sucesso!");
      carregarFuncionarios();
    } 
    
    catch (erro) {
      console.error("Erro ao deletar funcionário:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao deletar funcionário.";
      toast.error(mensagem);
    }
  };

  const funcionariosFiltrados = funcionarios.filter(f =>
    (f.nome.toLowerCase().includes(busca.toLowerCase()) ||
     f.email.toLowerCase().includes(busca.toLowerCase())) &&
    (filtro === "todos" || f.tipo === filtro)
  );

  return (
    <div className="pagina-funcionarios">
      <Sidebar definirSidebarAberta={setSidebarAberta} />
      <div className={`conteudo-principal ${sidebarAberta ? "menu-aberto" : "menu-colapsado"}`}>
        <DashboardHeader />
        <main className="area-principal">
          <CabecalhoSecao 
            abrirModalCadastrar={() => setModalCadastrarAberto(true)}
            abrirModalMedico={() => setModalMedicoAberto(true)}
          />
          <FiltroFuncionarios busca={busca} setBusca={setBusca} filtro={filtro} setFiltro={setFiltro} />

          {loading
            ? <div className="caixa-carregando">Carregando funcionários...</div>
            : 
            
            (funcionariosFiltrados.length
                ? <TabelaFuncionarios 
                    funcionarios={funcionariosFiltrados} 
                    deletarFuncionario={deletarFuncionario}
                    aoEditar={(funcionario) => {
                      setFuncionarioSelecionado(funcionario);
                      setModalEditarAberto(true);
                    }}
                  />
                : <EstadoVazio busca={busca} />
              )
          }
        </main>
      </div>

      {modalCadastrarAberto && (
        <CadastrarFuncionarioModal
          onClose={() => setModalCadastrarAberto(false)}
          onCadastrado={carregarFuncionarios}
        />
      )}

      {modalEditarAberto && funcionarioSelecionado && (
        <EditarFuncionarioModal
          funcionario={funcionarioSelecionado}
          onClose={() => {
            setModalEditarAberto(false);
            setFuncionarioSelecionado(null);
          }}
          onAtualizado={() => {
            carregarFuncionarios();
            setModalEditarAberto(false);
            setFuncionarioSelecionado(null);
          }}
        />
      )}

      {modalMedicoAberto && (
        <CadastrarMedicoModal
          onClose={() => setModalMedicoAberto(false)}
          onCadastrado={carregarFuncionarios}
        />
      )}
    </div>
  );
}
