import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "./EditarFuncionariosModal.scss";

export default function CadastrarMedicoModal({ onClose, onCadastrado }) {
  const [form, setForm] = useState({
    id_funcionario: "",
    nome: "",
    email: "",
    telefone: "",
    salario: "",
    crm: "",
    id_especialidade: "",
  });
  const [funcionarios, setFuncionarios] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resFuncionarios] = await Promise.all([
          api.get("/funcionarios"),
        ]);
        
        let especialidadesData = [];
        try {
          const resEspecialidades = await api.get("/especialidades");
          especialidadesData = resEspecialidades.data || [];
        } catch {
          especialidadesData = [];
        }

        setFuncionarios(resFuncionarios.data.resposta || []);
        setEspecialidades(especialidadesData);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        toast.error("Erro ao carregar dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        id_funcionario: form.id_funcionario ? parseInt(form.id_funcionario) : null,
        nome: form.nome,
        email: form.email,
        telefone: form.telefone || null,
        salario: form.salario ? parseFloat(form.salario) : null,
        crm: form.crm,
        id_especialidade: form.id_especialidade ? parseInt(form.id_especialidade) : null,
      };
      await api.post("/medicos", payload);
      toast.success("Médico cadastrado com sucesso!");
      onCadastrado();
      onClose();
    } catch (erro) {
      console.error("Erro ao cadastrar médico:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao cadastrar médico. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  if (loading) {
    return (
      <div className="modal-editar-funcionario">
        <div className="modal-conteudo">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-editar-funcionario">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Cadastrar Novo Médico</h2>

        <form onSubmit={handleSubmit}>
          <label>Funcionário *</label>
          <select
            name="id_funcionario"
            value={form.id_funcionario}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome} - {f.email}
              </option>
            ))}
          </select>

          <label>Nome *</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Telefone</label>
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <label>Salário</label>
          <input
            type="number"
            step="0.01"
            name="salario"
            value={form.salario}
            onChange={handleChange}
          />

          <label>CRM *</label>
          <input
            name="crm"
            value={form.crm}
            onChange={handleChange}
            required
            placeholder="Ex: CRM123456"
          />

          <label>Especialidade</label>
          <select
            name="id_especialidade"
            value={form.id_especialidade}
            onChange={handleChange}
          >
            <option value="">Selecione uma especialidade</option>
            {especialidades.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-salvar">
            Cadastrar Médico
          </button>
        </form>
      </div>
    </div>
  );
}

