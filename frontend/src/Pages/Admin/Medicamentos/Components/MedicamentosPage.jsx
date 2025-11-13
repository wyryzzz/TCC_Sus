import { useState, useEffect } from "react";
import { toast } from "sonner";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";
import api from "../../../../api";

import CabecalhoMedicamentos from "./CabecalhoMedicamentos";
import FiltrosMedicamentos from "./FiltroMedicamentos";
import TabelaMedicamentos from "./TabelaMedicamentos";
import EditarModal from "../EditarModal/EditarModal";
import "../Styles/MedicamentosPage.scss";

export default function MedicamentosPage() {
  const [busca, setBusca] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    async function carregarMedicamentos() {
      try {
        const res = await api.get("/medicamentos");
        setMedicamentos(res.data);
      } 
      
      catch {
        setError("Erro ao carregar medicamentos");
      }
      
      finally {
        setLoading(false);
      }
    }
    carregarMedicamentos();
  }, []);

  const medicamentosFiltrados = medicamentos.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase())
  );

  async function deletarMedicamento(id) {
    if (!window.confirm("Tem certeza que deseja deletar este medicamento?")) return;
    try {
      await api.delete(`/medicamentos/${id}`);
      toast.success("Medicamento deletado com sucesso!");
      const res = await api.get("/medicamentos");
      setMedicamentos(res.data);
    } 
    
    catch (err) {
      console.error(err);
      const mensagem = err.response?.data?.erro || err.message || "Erro ao deletar medicamento.";
      toast.error(mensagem);
    }
  }

  function abrirModalEditar(medicamento) {
    setMedicamentoSelecionado(medicamento);
    setModoEdicao(true);
    setModalAberto(true);
  }

  function abrirModalCadastrar() {
    setMedicamentoSelecionado(null);
    setModoEdicao(false);
    setModalCadastrarAberto(true);
  }

  async function cadastrarMedicamento(dados) {
    try {
      const payload = {
        nome: dados.nome,
        principio_ativo: dados.principio_ativo || null,
        dosagem_forma: dados.dosagem_forma || null,
        estoque: dados.estoque ? parseInt(dados.estoque) : 0,
        fornecedor: dados.fornecedor || null,
        validade: dados.validade || null,
        status: dados.status || "disponível",
      };
      await api.post("/medicamentos", payload);
      toast.success("Medicamento cadastrado com sucesso!");
      const res = await api.get("/medicamentos");
      setMedicamentos(res.data);
      setModalCadastrarAberto(false);
    } catch (err) {
      console.error("Erro ao cadastrar medicamento:", err);
      const mensagem = err.response?.data?.erro || err.message || "Erro ao cadastrar medicamento. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  async function atualizarMedicamento(dadosAtualizados) {
    try {
      const id = medicamentoSelecionado.id;
      const payload = {
        nome: dadosAtualizados.nome,
        dosagem_forma: dadosAtualizados.dosagem_forma || null,
        estoque: dadosAtualizados.estoque ? parseInt(dadosAtualizados.estoque) : 0,
        fornecedor: dadosAtualizados.fornecedor || null,
        validade: dadosAtualizados.validade || null,
        status: dadosAtualizados.status || "disponível",
      };
      await api.put(`/medicamentos/${id}`, payload);
      toast.success("Medicamento atualizado com sucesso!");
      const res = await api.get("/medicamentos");
      setMedicamentos(res.data);
      setModalAberto(false);
      setMedicamentoSelecionado(null);
    } catch (err) {
      console.error("Erro ao atualizar medicamento:", err);
      const mensagem = err.response?.data?.erro || err.message || "Erro ao atualizar medicamento. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  const camposEditar = [
    { nome: "nome", label: "Nome do Medicamento", tipo: "text" },
    { nome: "dosagem_forma", label: "Dosagem / Forma", tipo: "text" },
    { nome: "estoque", label: "Estoque", tipo: "number" },
    { nome: "fornecedor", label: "Fornecedor", tipo: "text" },
    { nome: "validade", label: "Validade", tipo: "date" },
    { nome: "status", label: "Status", tipo: "select", opcoes: ["disponível", "indisponível"] },
  ];

  const camposCadastrar = [
    { nome: "nome", label: "Nome do Medicamento *", tipo: "text" },
    { nome: "principio_ativo", label: "Princípio Ativo *", tipo: "text" },
    { nome: "dosagem_forma", label: "Dosagem / Forma", tipo: "text" },
    { nome: "estoque", label: "Estoque", tipo: "number" },
    { nome: "fornecedor", label: "Fornecedor", tipo: "text" },
    { nome: "validade", label: "Validade", tipo: "date" },
    { nome: "status", label: "Status", tipo: "select", opcoes: ["disponível", "indisponível"] },
  ];

  return (
    <div
      className={`pagina-medicamentos ${sidebarAberta ? "sidebar-aberta" : "sidebar-colapsada"
        }`}
    >
      <Sidebar definirSidebarAberta={setSidebarAberta} />
      <div className="conteudo-principal">
        <DashboardHeader />
        <main className="conteudo">
          <CabecalhoMedicamentos abrirModalCadastrar={abrirModalCadastrar} />
          <FiltrosMedicamentos busca={busca} setBusca={setBusca} />
          <TabelaMedicamentos
            medicamentos={medicamentosFiltrados}
            loading={loading}
            error={error}
            deletarMedicamento={deletarMedicamento}
            editarMedicamento={abrirModalEditar}
          />
        </main>
      </div>

      {modalAberto && medicamentoSelecionado && (
        <EditarModal
          titulo="Editar Medicamento"
          descricao="Atualize as informações do medicamento"
          campos={camposEditar}
          valoresIniciais={medicamentoSelecionado}
          onClose={() => {
            setModalAberto(false);
            setMedicamentoSelecionado(null);
          }}
          onSubmit={atualizarMedicamento}
        />
      )}

      {modalCadastrarAberto && (
        <EditarModal
          titulo="Cadastrar Novo Medicamento"
          descricao="Preencha as informações do novo medicamento"
          campos={camposCadastrar}
          valoresIniciais={{}}
          onClose={() => setModalCadastrarAberto(false)}
          onSubmit={cadastrarMedicamento}
        />
      )}
    </div>
  );
}
