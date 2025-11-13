import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "./EditarFuncionariosModal.scss";

export default function CadastrarFuncionarioModal({ onClose, onCadastrado }) {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    departamento: "",
    cargo: "",
    data_admissao: "",
    salario: "",
    funcionario_ativo: 1,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        nome: form.nome,
        cpf: form.cpf || null,
        email: form.email,
        telefone: form.telefone || null,
        endereco: form.endereco || null,
        departamento: form.departamento || null,
        cargo: form.cargo || null,
        salario: form.salario ? parseFloat(form.salario) : null,
        funcionario_ativo: Number(form.funcionario_ativo),
        date: form.data_admissao || null,
      };
      await api.post("/funcionarios", payload);
      toast.success("Funcionário cadastrado com sucesso!");
      onCadastrado();
      onClose();
    } catch (erro) {
      console.error("Erro ao cadastrar funcionário:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao cadastrar funcionário. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  return (
    <div className="modal-editar-funcionario">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Cadastrar Novo Funcionário</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome *</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>CPF *</label>
          <input
            name="cpf"
            value={form.cpf}
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

          <label>Endereço</label>
          <input
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />

          <label>Departamento</label>
          <input
            name="departamento"
            value={form.departamento}
            onChange={handleChange}
          />

          <label>Cargo</label>
          <input
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
          />

          <label>Data de Admissão</label>
          <input
            type="date"
            name="data_admissao"
            value={form.data_admissao}
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

          <label>Status</label>
          <select
            name="funcionario_ativo"
            value={form.funcionario_ativo}
            onChange={handleChange}
          >
            <option value={1}>Ativo</option>
            <option value={0}>Inativo</option>
          </select>

          <button type="submit" className="btn-salvar">
            Cadastrar Funcionário
          </button>
        </form>
      </div>
    </div>
  );
}

