import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "../Styles/ModalConsulta.scss";

export default function ModalConsulta({ consulta, onClose, onSalvar }) {
  const [form, setForm] = useState({
    paciente_id: "",
    funcionario_id: "",
    data_hora: "",
    tipo_consulta: "",
    unidade: "",
    status: "Agendada",
  });
  const [pacientes, setPacientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const isEdicao = !!consulta;

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPacientes, resMedicos] = await Promise.all([
          api.get("/pacientes"),
          api.get("/medicos"),
        ]);

        setPacientes(resPacientes.data);
        // Mostrar todos os médicos, incluindo aqueles sem id_funcionario
        setFuncionarios(resMedicos.data);

        if (consulta) {
          let dataHoraFormatada = "";
          if (consulta.data_hora) {
            try {
              const dataHora = new Date(consulta.data_hora);
              if (!isNaN(dataHora.getTime())) {
                dataHoraFormatada = dataHora.toISOString().slice(0, 16);
              }
            } catch (e) {
              console.error("Erro ao formatar data:", e);
            }
          }
          setForm({
            paciente_id: consulta.paciente_id || "",
            funcionario_id: consulta.funcionario_id || "",
            data_hora: dataHoraFormatada,
            tipo_consulta: consulta.tipo_consulta || "",
            unidade: consulta.unidade || "",
            status: consulta.status || "Agendada",
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [consulta]);

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
        funcionario_id: Number(form.funcionario_id),
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

  if (loading) {
    return (
      <div className="modal-consulta-overlay">
        <div className="modal-consulta">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-consulta-overlay">
      <div className="modal-consulta">
        <button className="fechar" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>{isEdicao ? "Editar Consulta" : "Agendar Nova Consulta"}</h2>
        <p>{isEdicao ? "Atualize as informações da consulta" : "Preencha os dados para agendar uma nova consulta"}</p>

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
            <label>Médico *</label>
            <select
              name="funcionario_id"
              value={form.funcionario_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um médico</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id_funcionario}>
                  {f.nome} - {f.crm}
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
              {isEdicao ? "Atualizar" : "Agendar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

