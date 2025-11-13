import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import api from "../../../../api";
import "./EditarPacientesModal.scss"

export default function EditarPacienteModal({ paciente, onClose, onAtualizado }) {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    cartao_sus: "",
    email: "",
    tipo_sanguineo: "",
    status: "ativo",
  });

  useEffect(() => {
    if (paciente) setForm(paciente);
  }, [paciente]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/pacientes/${paciente.id}`, form);
      toast.success("Paciente atualizado com sucesso!");
      onAtualizado();
      onClose();
    } 
    
    catch (erro) {
      console.error("Erro ao atualizar paciente:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao atualizar paciente. Verifique os dados e tente novamente.";
      toast.error(mensagem);
    }
  }

  if (!paciente) return null;

  return (
    <div className="modal-editar-paciente">
      <div className="modal-conteudo">
        <button className="fechar" onClick={onClose}><X size={18} /></button>
        <h2>Editar Paciente</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} required />

          <label>CPF</label>
          <input name="cpf" value={form.cpf} onChange={handleChange} required />

          <label>Cartão SUS</label>
          <input name="cartao_sus" value={form.cartao_sus} onChange={handleChange} />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />

          <label>Tipo Sanguíneo</label>
          <input name="tipo_sanguineo" value={form.tipo_sanguineo} onChange={handleChange} />

          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>

          <button type="submit" className="btn-salvar">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
