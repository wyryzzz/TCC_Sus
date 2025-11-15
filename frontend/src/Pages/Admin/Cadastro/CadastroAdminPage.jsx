import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, User, Mail, Lock, UserCheck, Stethoscope, Shield } from "lucide-react";
import { toast } from "sonner";
import api from "../../../api";
import "./CadastroAdminPage.scss";

export default function CadastroAdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo_usuario: "medico",
    // Campos específicos para médico
    crm: "",
    cpf: "",
    telefone: "",
    endereco: "",
    departamento: "Medicina",
    cargo: "Médico",
    salario: "",
    id_especialidade: null,
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [validation, setValidation] = useState({
    senhaMinLength: false,
    senhasMatch: false,
  });

  useEffect(() => {
    // Verificar se o usuário é admin
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    if (usuario.role !== "admin") {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate("/dashboard");
      return;
    }

    // Carregar especialidades se for médico
    carregarEspecialidades();
  }, [navigate]);

  async function carregarEspecialidades() {
    try {
      // Se houver endpoint de especialidades, usar aqui
      // Por enquanto, deixar vazio
      setEspecialidades([]);
    } catch (erro) {
      console.error("Erro ao carregar especialidades:", erro);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "senha") {
      setValidation({
        ...validation,
        senhaMinLength: value.length >= 6,
        senhasMatch: value === form.confirmarSenha && value.length > 0,
      });
    }
    if (name === "confirmarSenha") {
      setValidation({
        ...validation,
        senhasMatch: value === form.senha && value.length > 0,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (form.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    // Validações específicas por tipo
    if (form.tipo_usuario === "medico" && !form.crm) {
      toast.error("CRM é obrigatório para médicos!");
      return;
    }

    setLoading(true);
    try {
      if (form.tipo_usuario === "admin") {
        // Cadastrar administrador
        const payload = {
          nome: form.nome,
          email: form.email,
          senha: form.senha,
        };

        await api.post("/admin/cadastrar/administrador", payload);
        toast.success("Administrador cadastrado com sucesso!");
      } else if (form.tipo_usuario === "medico") {
        // Cadastrar médico
        const payload = {
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          crm: form.crm,
          cpf: form.cpf || null,
          telefone: form.telefone || null,
          endereco: form.endereco || null,
          departamento: form.departamento || "Medicina",
          cargo: form.cargo || "Médico",
          salario: form.salario ? parseFloat(form.salario) : 0,
          id_especialidade: form.id_especialidade || null,
          data_admissao: new Date().toISOString().split("T")[0],
        };

        await api.post("/admin/cadastrar/medico", payload);
        toast.success("Médico cadastrado com sucesso!");
      }

      // Limpar formulário
      setForm({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        tipo_usuario: "medico",
        crm: "",
        cpf: "",
        telefone: "",
        endereco: "",
        departamento: "Medicina",
        cargo: "Médico",
        salario: "",
        id_especialidade: null,
      });

      // Opcional: redirecionar após um tempo
      setTimeout(() => {
        // Pode redirecionar para lista de funcionários ou manter na página
      }, 1500);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      const mensagem = erro.response?.data?.erro || erro.message || "Erro ao criar conta. Tente novamente.";
      toast.error(mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cadastro-admin-page">
      <div className="cadastro-admin-container">
        <div className="cadastro-admin-content">
          <button onClick={() => navigate("/dashboard")} className="back-link">
            <ArrowLeft size={18} />
            <span>Voltar para o dashboard</span>
          </button>

          <div className="cadastro-admin-header">
            <h1 className="cadastro-admin-title">Cadastrar Usuário Administrativo</h1>
            <p className="cadastro-admin-subtitle">
              Cadastre novos administradores ou médicos no sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="cadastro-admin-form">
            <div className="form-group">
              <label className="form-label">
                <UserCheck size={18} className="label-icon" />
                Tipo de Usuário *
              </label>
              <select
                name="tipo_usuario"
                value={form.tipo_usuario}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="medico">Médico</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <User size={18} className="label-icon" />
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={18} className="label-icon" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="form-input"
              />
            </div>

            {form.tipo_usuario === "medico" && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    <Stethoscope size={18} className="label-icon" />
                    CRM *
                  </label>
                  <input
                    type="text"
                    name="crm"
                    value={form.crm}
                    onChange={handleChange}
                    placeholder="Ex: CRM/SP 123456"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(11) 98765-4321"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Endereço</label>
                  <input
                    type="text"
                    name="endereco"
                    value={form.endereco}
                    onChange={handleChange}
                    placeholder="Endereço completo"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Salário</label>
                  <input
                    type="number"
                    name="salario"
                    value={form.salario}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="form-input"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">
                <Lock size={18} className="label-icon" />
                Senha *
              </label>
              <div className="password-wrapper">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  className={`form-input ${validation.senhaMinLength ? "valid" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="password-toggle"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {form.senha && (
                <div className={`validation-message ${validation.senhaMinLength ? "success" : "error"}`}>
                  {validation.senhaMinLength ? "✓" : "✗"} Mínimo de 6 caracteres
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={18} className="label-icon" />
                Confirmar Senha *
              </label>
              <div className="password-wrapper">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                  className={`form-input ${
                    validation.senhasMatch && form.confirmarSenha ? "valid" : form.confirmarSenha ? "invalid" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className="password-toggle"
                >
                  {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {form.confirmarSenha && (
                <div className={`validation-message ${validation.senhasMatch ? "success" : "error"}`}>
                  {validation.senhasMatch ? "✓" : "✗"} As senhas devem coincidir
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !validation.senhaMinLength || !validation.senhasMatch}
              className="cadastro-admin-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Cadastrando...
                </>
              ) : (
                <>
                  {form.tipo_usuario === "admin" ? (
                    <>
                      <Shield size={20} />
                      Cadastrar Administrador
                    </>
                  ) : (
                    <>
                      <Stethoscope size={20} />
                      Cadastrar Médico
                    </>
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

