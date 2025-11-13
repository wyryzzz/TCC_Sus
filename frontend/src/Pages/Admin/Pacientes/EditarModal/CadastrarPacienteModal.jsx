import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "./EditarPacientesModal.scss";

export default function CadastrarPacienteModal({ onClose, onCadastrado }) {
  const [form, setForm] = useState({
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    senha: "",
    endereco: "",
    telefone: "",
    cartao_sus: "",
    tipo_sanguineo: "",
    alergias: "",
    contato_emergencia: "",
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
        cpf: form.cpf,
        email: form.email,
        data_nascimento: form.data_nascimento || null,
        endereco: form.endereco || null,
        telefone: form.telefone || null,
        cartao_sus: form.cartao_sus || null,
        tipo_sanguineo: form.tipo_sanguineo || null,
        alergias: form.alergias || null,
        contato_emergencia: form.contato_emergencia || null,
        data_cadastro: new Date().toISOString().split("T")[0],
      };

      // Primeiro, criar a conta de usuário
      const usuarioPayload = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        tipo_usuario: "paciente"
      };
      await api.post("/criar/conta", usuarioPayload);

      // Depois, cadastrar na tabela pacientes
      await api.post("/pacientes", payload);

      toast.success("Paciente cadastrado com sucesso!");
      onCadastrado();
      onClose();
    } catch (erro) {
      console.error("Erro ao cadastrar paciente:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao cadastrar paciente. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  return (
    <div className="modal-editar-paciente">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onClose}>
          <X size={18} />
        </button>
        <h2>Cadastrar Novo Paciente</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome *</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
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
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Senha *</label>
          <input
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
            placeholder="Digite uma senha para o paciente"
          />

          <label>Endereço</label>
          <input
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />

          <label>Telefone</label>
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <label>Cartão SUS</label>
          <input
            name="cartao_sus"
            value={form.cartao_sus}
            onChange={handleChange}
          />

          <label>Tipo Sanguíneo</label>
          <select
            name="tipo_sanguineo"
            value={form.tipo_sanguineo}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label>Alergias</label>
          <textarea
            name="alergias"
            value={form.alergias}
            onChange={handleChange}
            rows="3"
          />

          <label>Contato de Emergência</label>
          <input
            name="contato_emergencia"
            value={form.contato_emergencia}
            onChange={handleChange}
          />

          <button type="submit" className="btn-salvar">
            Cadastrar Paciente
          </button>
        </form>
      </div>
    </div>
  );
}
