import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "./EditarFuncionariosModal.scss";

export default function EditarFuncionarioModal({ funcionario, onClose, onAtualizado }) {
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

  useEffect(() => {
    if (funcionario) {
      let dataFormatada = "";
      if (funcionario.data_admissao) {
        if (funcionario.data_admissao.includes("-") && funcionario.data_admissao.length === 10) {
          dataFormatada = funcionario.data_admissao;
        } else if (funcionario.dataAdmissao) {
          dataFormatada = converterDataParaInput(funcionario.dataAdmissao);
        }
      }

      let salarioFormatado = "";
      if (funcionario.salario) {
        if (typeof funcionario.salario === "string") {
          salarioFormatado = funcionario.salario.replace("R$ ", "").replace(",", ".").trim();
        } else if (typeof funcionario.salario === "number") {
          salarioFormatado = funcionario.salario.toString();
        }
      }

      setForm({
        nome: funcionario.nome || "",
        cpf: funcionario.cpf || "",
        email: funcionario.email || "",
        telefone: funcionario.telefone || "",
        endereco: funcionario.endereco || "",
        departamento: funcionario.departamento || funcionario.tipo || "",
        cargo: funcionario.cargo || "",
        data_admissao: dataFormatada,
        salario: salarioFormatado,
        funcionario_ativo: funcionario.status === "ativo" ? 1 : 0,
      });
    }
  }, [funcionario]);

  function converterDataParaInput(dataBR) {
    if (!dataBR || typeof dataBR !== "string") return "";
    const partes = dataBR.split("/");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
    return "";
  }

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
        data_admissao: form.data_admissao || null,
      };
      await api.put(`/funcionarios/${funcionario.id}`, payload);
      toast.success("Funcionário atualizado com sucesso!");
      onAtualizado(); 
      onClose(); 
    } catch (erro) {
      console.error("Erro ao atualizar funcionário:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao salvar alterações. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  if (!funcionario) return null;

  return (
    <div className="modal-editar-funcionario">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onClose}>
          <X size={18} />
        </button>

        <h2>Editar Funcionário</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>CPF</label>
          <input
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
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
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
