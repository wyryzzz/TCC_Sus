import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, User, LogOut, Plus, Download } from "lucide-react";
import { toast } from "sonner";
import api from "../../api";

export default function PacientesPa() {
  const navigate = useNavigate();
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [prescricoes, setPrescricoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        const pacienteEmail = usuario.email;

        if (!pacienteEmail) {
          toast.error("E-mail do paciente não encontrado. Faça login novamente.");
          navigate("/login");
          return;
        }

        const resPaciente = await api.get('/pacientes/email', { params: { email: pacienteEmail } });
        setPaciente(resPaciente.data);

        const resConsultas = await api.get(`/consultas/paciente/${resPaciente.data.id}`);
        setConsultas(resConsultas.data || []);

        const resPrescricoes = await api.get(`/pacientes/${resPaciente.data.id}/prescricoes`);
        setPrescricoes(resPrescricoes.data || []);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        toast.error("Erro ao carregar dados do paciente.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [navigate]);

  const handleExportData = () => {
    if (!paciente) return;

    const data = {
      nome: paciente.nome,
      cpf: paciente.cpf,
      dataNascimento: paciente.data_nascimento,
      consultas: consultas.length,
      prescricoes: prescricoes.length,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dados-paciente-${paciente.nome.replace(/\s/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Dados exportados com sucesso!");
  };

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  function formatarData(data) {
    if (!data) return "-";
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  }

  function formatarDataHora(dataHora) {
    if (!dataHora) return "-";
    const date = new Date(dataHora);
    return date.toLocaleString("pt-BR");
  }

  const consultasAgendadas = consultas.filter(c =>
    c.status === "Agendada" || c.status === "agendada" || c.status === "Confirmada"
  ).length;

  const consultasRealizadas = consultas.filter(c =>
    c.status === "Concluída" || c.status === "realizada"
  ).length;

  const prescricoesAtivas = prescricoes.filter(p => {
    if (!p.fim) return true;
    const dataFim = new Date(p.fim);
    return dataFim >= new Date();
  }).length;

  const proximasConsultas = consultas
    .filter(c => {
      const status = c.status?.toLowerCase();
      return status === "agendada" || status === "confirmada";
    })
    .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))
    .slice(0, 3);

  const historicoConsultas = consultas
    .filter(c => {
      const status = c.status?.toLowerCase();
      return status === "concluída" || status === "realizada";
    })
    .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Carregando...</p>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Paciente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-cyan-100/35 to-cyan-50/35 shadow-lg px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src="/assets/images/logo.png"
              alt="Logo SUS"
              className="w-12 h-12 md:w-16 md:h-16 object-cover"
            />
            <div>
              <h1 className="text-black">Sistema de Gestão SUS</h1>
              <p className="text-black text-sm md:text-base">Paciente - {paciente.nome}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-black">Paciente</p>
              <p className="text-black">{paciente.nome}</p>
            </div>
            <button
              className="rounded-full bg-white/20 hover:bg-white/30 p-2"
              onClick={sair}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8">
        <section className="mb-8">
          <div className="bg-gradient-to-r from-cyan-100/25 to-white/25 rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-6 h-6" />
              <h2 className="text-black">Meus Dados Pessoais</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-black mb-1">Nome Completo</p>
                <p className="text-black/80">{paciente.nome || "-"}</p>
              </div>
              <div>
                <p className="text-black mb-1">Data de Nascimento</p>
                <p className="text-black/80">{formatarData(paciente.data_nascimento)}</p>
              </div>
              <div>
                <p className="text-black mb-1">Tipo Sanguíneo</p>
                <p className="text-black/80">{paciente.tipo_sanguineo || "-"}</p>
              </div>
              <div>
                <p className="text-black mb-1">CPF</p>
                <p className="text-black/80">{paciente.cpf || "-"}</p>
              </div>
              <div>
                <p className="text-black mb-1">Endereço</p>
                <p className="text-black/80">{paciente.endereco || "-"}</p>
              </div>
              <div>
                <p className="text-black mb-1">Telefone</p>
                <p className="text-black/80">{paciente.telefone || "-"}</p>
              </div>
              <div>
                <p className="text-black mb-1">Cartão SUS</p>
                <p className="text-black/80">{paciente.cartao_sus || "-"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-black mb-1">Alergias</p>
                <p className={paciente.alergias ? "text-red-500" : "text-black/80"}>
                  {paciente.alergias || "Nenhuma alergia registrada"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#75B7F5] text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/90 mb-2">Consultas Agendadas</p>
                <p className="text-white text-2xl font-bold">{consultasAgendadas}</p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-[#65D9D3] text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/90 mb-2">Consultas Realizadas</p>
                <p className="text-white text-2xl font-bold">{consultasRealizadas}</p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-[#9792ED] text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/90 mb-2">Prescrições Ativas</p>
                <p className="text-white text-2xl font-bold">{prescricoesAtivas}</p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-gradient-to-r from-white/11 to-green-200/6 rounded-xl shadow-lg p-6 md:p-8 border border-gray-300/25">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-black">Minhas Próximas Consultas</h2>
              <button className="bg-[#75B7F5] hover:bg-[#5fa3e0] text-white flex items-center gap-2 px-4 py-2 rounded" onClick={() => toast.info("Para agendar consulta, entre em contato com sua unidade de saúde.")}>
                <Plus className="w-4 h-4" /> Agendar Consulta
              </button>
            </div>

            {proximasConsultas.length === 0 ? (
              <p className="text-black/60">Nenhuma consulta agendada.</p>
            ) : (
              proximasConsultas.map((consulta) => {
                const dataHora = new Date(consulta.data_hora);
                return (
                  <div key={consulta.id} className="bg-gradient-to-r from-white/11 to-green-200/6 rounded-xl p-4 md:p-6 border border-gray-300/50 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      <div>
                        <p className="text-black mb-1">Médico</p>
                        <p className="text-black/60 text-sm mb-2">{consulta.tipo_consulta || "Consulta"}</p>
                        <p className="text-black">{consulta.nome_funcionario || "-"}</p>
                      </div>
                      <div>
                        <p className="text-black mb-1">Data</p>
                        <p className="text-black">{formatarData(consulta.data_hora)}</p>
                      </div>
                      <div>
                        <p className="text-black mb-1">Horário</p>
                        <p className="text-black">{dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                      <div>
                        <p className="text-black mb-1">Local</p>
                        <p className="text-black">{consulta.unidade || "-"}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/50 rounded-md border border-gray-300/50 text-xs">
                          {consulta.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section>
          <div className="bg-white/6 rounded-xl shadow-lg p-6 md:p-8 border border-gray-300/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-black">Histórico Médico</h2>
              <div className="flex gap-2">
                <button
                  className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => setShowFullHistory(!showFullHistory)}
                >
                  {showFullHistory ? "Ver Menos" : "Ver Mais"}
                </button>
                <button
                  className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
                  onClick={handleExportData}
                >
                  <Download className="w-4 h-4" /> Exportar
                </button>
              </div>
            </div>

            {historicoConsultas.length === 0 ? (
              <p className="text-black/60">Nenhum histórico disponível.</p>
            ) : (
              <>
                {historicoConsultas.slice(0, showFullHistory ? historicoConsultas.length : 1).map((consulta, index) => {
                  const prescricao = prescricoes.find(p => {
                    const dataPrescricao = new Date(p.inicio);
                    const dataConsulta = new Date(consulta.data_hora);
                    return Math.abs(dataPrescricao - dataConsulta) < 86400000; // Dentro de 24 horas
                  });

                  return (
                    <div key={consulta.id || index} className="border border-gray-300/55 rounded-md p-4 md:p-6 mb-4">
                      <p className="text-black mb-6">Data: {formatarDataHora(consulta.data_hora)}</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-black mb-2">Médico</p>
                            <div className="bg-gradient-to-r from-white/22 to-green-200/22 rounded-lg p-3">
                              <p className="text-black">{consulta.nome_funcionario || "-"}</p>
                            </div>
                          </div>
                          {prescricao && (
                            <div>
                              <p className="text-black mb-2">Prescrição</p>
                              <div className="bg-gradient-to-r from-white/22 to-green-200/22 rounded-lg p-3">
                                <p className="text-black">
                                  {prescricao.medicamento} {prescricao.dosagem && `- ${prescricao.dosagem}`}
                                  {prescricao.frequencia && ` - ${prescricao.frequencia}`}
                                </p>
                                {prescricao.observacoes && (
                                  <p className="text-black/80 text-sm mt-2">{prescricao.observacoes}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-black mb-2">Tipo de Consulta</p>
                            <div className="bg-gradient-to-r from-white/22 to-green-200/22 rounded-lg p-3">
                              <p className="text-black">{consulta.tipo_consulta || "Consulta geral"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-black mb-2">Unidade</p>
                            <div className="bg-gradient-to-r from-green-200/12 to-green-200/22 rounded-lg p-3">
                              <p className="text-black">{consulta.unidade || "-"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
