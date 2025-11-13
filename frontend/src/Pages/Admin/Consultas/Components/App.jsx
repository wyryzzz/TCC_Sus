import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../../../../api";

import Sidebar from "../../../../components/Sidebar/Sidebar";
import DashboardHeader from "../../../../components/Header/DashboardHeader";
import CabecalhoConsultas from "./CabecalhoConsultas";
import FiltrosConsultas from "./FiltrosConsultas";
import TabelaConsultas from "./TabelasConsultas";
import ModalConsulta from "./ModalConsulta";
import "../Styles/ConsultasPage.scss";

export default function PaginaConsultas() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCadastrarAberto, setModalCadastrarAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  async function carregarConsultas() {
    try {
      setCarregando(true);
      let { data } = await api.get("/consultas");
      setConsultas(data);
    } 
    
    catch (err) {
      console.error(err);
      setErro("Não foi possível carregar as consultas.");
    } 
    
    finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarConsultas();
  }, []);

  async function deletarConsulta(id) {
    if (!window.confirm("Deseja realmente excluir esta consulta?")) return;

    try {
      await api.delete(`/consultas/${id}`);
      toast.success("Consulta deletada com sucesso!");
      carregarConsultas();
    } 
    
    catch (err) {
      console.error(err);
      const mensagem = err.response?.data?.erro || err.message || "Não foi possível deletar esta consulta.";
      toast.error(mensagem);
    }
  }

  function abrirModalEditar(consulta) {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  }

  function abrirModalCadastrar() {
    setConsultaSelecionada(null);
    setModalCadastrarAberto(true);
  }

  async function salvarConsulta(dados) {
    try {
      if (consultaSelecionada) {
        await api.put(`/consultas/${consultaSelecionada.id}`, dados);
        toast.success("Consulta atualizada com sucesso!");
      } else {
        await api.post("/consultas", dados);
        toast.success("Consulta agendada com sucesso!");
      }
      carregarConsultas();
    } catch (err) {
      console.error("Erro ao salvar consulta:", err);
      const mensagem = err.response?.data?.erro || err.message || "Erro ao salvar consulta. Verifique os dados e tente novamente.";
      toast.error(mensagem);
      throw err;
    }
  }

  const consultasFiltradas = consultas.filter((c) =>
    (c.nome_paciente.toLowerCase().includes(busca.toLowerCase()) ||
     c.nome_funcionario.toLowerCase().includes(busca.toLowerCase())) &&
    (statusFiltro === "todos" || c.status.toLowerCase() === statusFiltro.toLowerCase())
  );

  return (
    <div className="painel-geral">
      <Sidebar definirSidebarAberta={setMenuAberto} />
      <div className={`conteudo-principal ${menuAberto ? "menu-aberto" : "menu-colapsado"}`}>
        <DashboardHeader />
        <main className="conteudo-consultas">
          <CabecalhoConsultas abrirModalCadastrar={abrirModalCadastrar} />

          <FiltrosConsultas
            busca={busca}
            setBusca={setBusca}
            statusFiltro={statusFiltro}
            setStatusFiltro={setStatusFiltro}
          />

          {carregando ? (
            <div className="estado-carregando"><p>Carregando consultas...</p></div>
          ) 
          
          : erro ? (
            <div className="estado-erro">
              <p>{erro}</p>
              <button onClick={carregarConsultas}>Tentar novamente</button>
            </div>
          )
          
          : (
            <TabelaConsultas 
              consultas={consultasFiltradas} 
              aoDeletar={deletarConsulta}
              aoEditar={abrirModalEditar}
            />
          )}
        </main>
      </div>

      {modalAberto && consultaSelecionada && (
        <ModalConsulta
          consulta={consultaSelecionada}
          onClose={() => {
            setModalAberto(false);
            setConsultaSelecionada(null);
          }}
          onSalvar={salvarConsulta}
        />
      )}

      {modalCadastrarAberto && (
        <ModalConsulta
          consulta={null}
          onClose={() => setModalCadastrarAberto(false)}
          onSalvar={salvarConsulta}
        />
      )}
    </div>
  );
}
