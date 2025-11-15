import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, User, LogOut, Plus, Download, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import api from "../../api";
import "./MedicosPage.scss";
import Header from "./Header";

export default function MedicosPage() {
  const navigate = useNavigate();
  const [medico, setMedico] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalConsulta, setModalConsulta] = useState(false);
  const [modalPrescricao, setModalPrescricao] = useState(false);
  const [pacientesDisponiveis, setPacientesDisponiveis] = useState([]);
  const [medicamentosDisponiveis, setMedicamentosDisponiveis] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        
        // Verificar se o usuário é médico
        if (usuario.role !== "medico") {
          toast.error("Acesso negado. Esta página é apenas para médicos.");
          navigate("/login");
          return;
        }

        const medicoEmail = usuario.email;

        if (!medicoEmail) {
          toast.error("E-mail do médico não encontrado. Faça login novamente.");
          navigate("/login");
          return;
        }

        // Buscar médico por email
        let medicoData = null;
        try {
          const resMedico = await api.get(`/medicos/email/${medicoEmail}`);
          medicoData = resMedico.data;
        } catch (erroMedico) {
          console.error("Erro ao buscar médico:", erroMedico);
          toast.error("Médico não encontrado. Verifique se seu cadastro está completo.");
          navigate("/login");
          return;
        }

        if (!medicoData) {
          toast.error("Dados do médico não encontrados.");
          navigate("/login");
          return;
        }

        setMedico(medicoData);

        // Buscar consultas do médico usando id_funcionario
        let consultasData = [];
        try {
          const funcionarioId = medicoData.id_funcionario;
          if (!funcionarioId) {
            throw new Error("ID do funcionário não encontrado.");
          }
          
          const resConsultas = await api.get(`/consultas/funcionario/${funcionarioId}`);
          consultasData = resConsultas.data || [];
        } catch (erroConsultas) {
          console.error("Erro ao carregar consultas:", erroConsultas);
          toast.error("Erro ao carregar consultas.");
        }

        setConsultas(consultasData);

        // Extrair pacientes únicos das consultas
        const pacientesUnicos = [];
        const pacientesIds = new Set();

        consultasData.forEach(consulta => {
          if (consulta.paciente_id && !pacientesIds.has(consulta.paciente_id)) {
            pacientesIds.add(consulta.paciente_id);
            pacientesUnicos.push({
              id: consulta.paciente_id,
              nome: consulta.nome_paciente || "Paciente não identificado"
            });
          }
        });

        setPacientes(pacientesUnicos);

        // Carregar pacientes disponíveis para agendamento
        try {
          const resPacientes = await api.get("/pacientes");
          setPacientesDisponiveis(resPacientes.data || []);
        } catch (erroPacientes) {
          console.error("Erro ao carregar pacientes disponíveis:", erroPacientes);
        }

        // Carregar medicamentos disponíveis
        try {
          const resMedicamentos = await api.get("/medicamentos");
          setMedicamentosDisponiveis(resMedicamentos.data || []);
        } catch (erroMedicamentos) {
          console.error("Erro ao carregar medicamentos disponíveis:", erroMedicamentos);
        }

      } catch (erro) {
        console.error("Erro geral ao carregar dados:", erro);
        const mensagem = erro.response?.data?.erro || "Erro ao carregar dados.";
        toast.error(mensagem);
        
        // Se não autenticado, redirecionar para login
        if (erro.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [navigate]);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  async function agendarConsulta(dadosConsulta) {
    try {
      if (!medico?.id_funcionario) {
        toast.error("Dados do médico não encontrados.");
        return;
      }

      // Garantir que funcionario_id está correto
      const dadosComFuncionario = {
        ...dadosConsulta,
        funcionario_id: medico.id_funcionario
      };

      await api.post("/consultas", dadosComFuncionario);
      toast.success("Consulta agendada com sucesso!");

      // Recarregar consultas
      const resConsultas = await api.get(`/consultas/funcionario/${medico.id_funcionario}`);
      const novasConsultas = resConsultas.data || [];
      setConsultas(novasConsultas);

      // Atualizar pacientes únicos
      const pacientesUnicos = [];
      const pacientesIds = new Set();
      novasConsultas.forEach(consulta => {
        if (consulta.paciente_id && !pacientesIds.has(consulta.paciente_id)) {
          pacientesIds.add(consulta.paciente_id);
          pacientesUnicos.push({
            id: consulta.paciente_id,
            nome: consulta.nome_paciente || "Paciente não identificado"
          });
        }
      });
      setPacientes(pacientesUnicos);

    } catch (erro) {
      console.error("Erro ao agendar consulta:", erro);
      const mensagem = erro.response?.data?.erro || "Erro ao agendar consulta. Tente novamente.";
      toast.error(mensagem);
    }
  }

  async function prescreverMedicamento(dadosPrescricao) {
    try {
      await api.post(`/pacientes/${dadosPrescricao.paciente_id}/prescricoes`, dadosPrescricao);
      toast.success("Prescrição criada com sucesso!");

      // Recarregar consultas para mostrar prescrições atualizadas
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const funcionarioId = medico?.id_funcionario || medico?.id || usuario.id;
      const resConsultas = await api.get(`/consultas/funcionario/${funcionarioId}`);
      setConsultas(resConsultas.data || []);

      setModalPrescricao(false);
      setPacienteSelecionado(null);
    } catch (erro) {
      console.error("Erro ao prescrever medicamento:", erro);
      toast.error("Erro ao prescrever medicamento. Tente novamente.");
    }
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

  const proximasConsultas = consultas
    .filter(c => {
      const status = c.status?.toLowerCase();
      return status === "agendada" || status === "confirmada";
    })
    .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Carregando...</p>
      </div>
    );
  }

  // Removido o check que impedia carregamento se medico for null

  return (
    <div className="medico-dashboard">
      <Header />

      <div className="conteudo">
        <section className="perfil-medico">
          <div className="perfil-info">
            <a href="#" className="perfil-link">
              <i className="fa-solid fa-user-doctor"></i> Meu Perfil médico
            </a>
            <div className="dados">
              <p><strong>Nome</strong><br />{medico?.nome || "Nome não disponível"}</p>
              <p><strong>CRM</strong><br />{medico?.crm || "Não informado"}</p>
              <p><strong>Especialidade</strong><br />{medico?.cargo || "Clínica Geral"}</p>
              <p><strong>Departamento</strong><br />{medico?.departamento || "Medicina"}</p>
            </div>
            <span className="email">{medico?.email || "Email não disponível"}</span>
          </div>
        </section>

        <section className="cards-resumo">
          <div className="card azul">
            <h3>Meus Pacientes</h3>
            <span>{pacientes.length}</span>
          </div>
          <div className="card verde">
            <h3>Consultas Agendadas</h3>
            <span>{consultasAgendadas}</span>
          </div>
          <div className="card roxo">
            <h3>Atendimentos</h3>
            <span>{consultasRealizadas}</span>
          </div>
          <div className="card laranja">
            <h3>Total Consultas</h3>
            <span>{consultas.length}</span>
          </div>
        </section>

        <section className="acoes-rapidas">
          <button
            className="btn-agendar"
            onClick={() => setModalConsulta(true)}
          >
            <Stethoscope size={20} />
            Agendar Consulta
          </button>
          <button
            className="btn-prescrever"
            onClick={() => setModalPrescricao(true)}
          >
            <FileText size={20} />
            Prescrever Medicamento
          </button>
        </section>

        <section className="proximos-atendimentos">
          <h2>Meus Próximos Atendimentos</h2>

          {proximasConsultas.length === 0 ? (
            <p className="text-black/60">Nenhuma consulta agendada.</p>
          ) : (
            proximasConsultas.map((consulta) => {
              const dataHora = new Date(consulta.data_hora);
              return (
                <div key={consulta.id} className="atendimento">
                  <div className="linha">
                    <p><strong>Paciente:</strong> {consulta.nome_paciente}</p>
                    <p><strong>Data:</strong> {formatarData(consulta.data_hora)}</p>
                    <p><strong>Horário:</strong> {dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
                    <span className="status normal">{consulta.tipo_consulta || "Consulta"}</span>
                  </div>
                  <p className="obs"><strong>Unidade:</strong> {consulta.unidade || "Não informado"}</p>
                  {consulta.prescricoes && (
                    <div className="prescricoes-consulta">
                      <p><strong>💊 Prescrições:</strong></p>
                      {consulta.prescricoes.split(' || ').map((prescricao, index) => (
                        <p key={index} className="prescricao-item">• {prescricao}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </section>

        <section className="meus-pacientes">
          <h2>Meus Pacientes</h2>

          {pacientes.length === 0 ? (
            <p className="text-black/60">Nenhum paciente encontrado.</p>
          ) : (
            pacientes.map((paciente) => {
              const consultasPaciente = consultas.filter(c => c.paciente_id === paciente.id);
              const ultimaConsulta = consultasPaciente.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))[0];

              return (
                <div key={paciente.id} className="paciente">
                  <div>
                    <p><strong>Nome:</strong> {paciente.nome}</p>
                    <p className="fone">ID: {paciente.id}</p>
                  </div>
                  <div>
                    <p><strong>Consultas:</strong> {consultasPaciente.length} total / {consultasPaciente.filter(c => c.status === "Agendada" || c.status === "Confirmada").length} agendadas</p>
                    <p><strong>Última:</strong> {ultimaConsulta ? formatarData(ultimaConsulta.data_hora) : "Nunca"}</p>
                    <p>{ultimaConsulta ? ultimaConsulta.tipo_consulta || "Consulta" : "Nenhuma consulta"}</p>
                  </div>
                </div>
              );
            })
          )}
        </section>

        {modalConsulta && (
          <ModalConsultaMedico
            onClose={() => setModalConsulta(false)}
            onSalvar={agendarConsulta}
            pacientes={pacientesDisponiveis}
            medicoId={medico?.id_funcionario}
          />
        )}

        {modalPrescricao && (
          <ModalPrescricaoMedico
            onClose={() => setModalPrescricao(false)}
            onSalvar={prescreverMedicamento}
            pacientes={pacientesDisponiveis}
            medicamentos={medicamentosDisponiveis}
            medicoNome={medico?.nome}
          />
        )}
      </div>
    </div>
  );
}

// Componente Modal para prescrição de medicamentos
function ModalPrescricaoMedico({ onClose, onSalvar, pacientes, medicamentos, medicoNome }) {
  const [form, setForm] = useState({
    paciente_id: "",
    medicamento: "",
    dosagem: "",
    frequencia: "",
    inicio: "",
    fim: "",
    observacoes: "",
    medico_nome: medicoNome || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        paciente_id: Number(form.paciente_id),
        medicamento: form.medicamento,
        dosagem: form.dosagem,
        frequencia: form.frequencia,
        inicio: form.inicio,
        fim: form.fim,
        observacoes: form.observacoes,
        medico_nome: form.medico_nome,
      };
      await onSalvar(payload);
      onClose();
    } catch (erro) {
      console.error("Erro ao salvar prescrição:", erro);
    }
  }

  return (
    <div className="modal-consulta-overlay">
      <div className="modal-consulta">
        <button className="fechar" onClick={onClose}>
          <span>&times;</span>
        </button>

        <h2>Prescrever Medicamento</h2>
        <p>Preencha os dados para prescrever um medicamento</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paciente *</label>
            <select
              name="paciente_id"
              value={form.paciente_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - {p.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Medicamento *</label>
            <select
              name="medicamento"
              value={form.medicamento}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um medicamento</option>
              {medicamentos.map((m) => (
                <option key={m.id} value={m.nome}>
                  {m.nome} - {m.fabricante}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Dosagem *</label>
            <input
              type="text"
              name="dosagem"
              value={form.dosagem}
              onChange={handleChange}
              placeholder="Ex: 500mg"
              required
            />
          </div>

          <div className="form-group">
            <label>Frequência *</label>
            <input
              type="text"
              name="frequencia"
              value={form.frequencia}
              onChange={handleChange}
              placeholder="Ex: 3x ao dia"
              required
            />
          </div>

          <div className="form-group">
            <label>Data de Início *</label>
            <input
              type="date"
              name="inicio"
              value={form.inicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Data de Fim</label>
            <input
              type="date"
              name="fim"
              value={form.fim}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              placeholder="Observações adicionais..."
              rows="3"
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit">
              Prescrever
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente Modal simplificado para médicos
function ModalConsultaMedico({ onClose, onSalvar, pacientes, medicoId }) {
  const [form, setForm] = useState({
    paciente_id: "",
    data_hora: "",
    tipo_consulta: "",
    unidade: "",
    status: "Agendada",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let dataHora = form.data_hora;
      if (dataHora && !dataHora.includes("T")) {
        dataHora = dataHora.replace(" ", "T");
      }

      const payload = {
        paciente_id: Number(form.paciente_id),
        funcionario_id: Number(medicoId),
        data_hora: dataHora,
        tipo_consulta: form.tipo_consulta,
        unidade: form.unidade,
        status: form.status,
      };
      await onSalvar(payload);
      onClose();
    } catch (erro) {
      console.error("Erro ao salvar consulta:", erro);
    }
  }

  return (
    <div className="modal-consulta-overlay">
      <div className="modal-consulta">
        <button className="fechar" onClick={onClose}>
          <span>&times;</span>
        </button>

        <h2>Agendar Nova Consulta</h2>
        <p>Preencha os dados para agendar uma nova consulta</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paciente *</label>
            <select
              name="paciente_id"
              value={form.paciente_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - {p.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Data e Hora *</label>
            <input
              type="datetime-local"
              name="data_hora"
              value={form.data_hora}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Consulta *</label>
            <select
              name="tipo_consulta"
              value={form.tipo_consulta}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="Consulta Geral">Consulta Geral</option>
              <option value="Consulta Especializada">Consulta Especializada</option>
              <option value="Retorno">Retorno</option>
              <option value="Exame">Exame</option>
              <option value="Avaliação">Avaliação</option>
            </select>
          </div>

          <div className="form-group">
            <label>Unidade de Saúde *</label>
            <input
              type="text"
              name="unidade"
              value={form.unidade}
              onChange={handleChange}
              placeholder="Ex: UBS Centro"
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Agendada">Agendada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit">
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
