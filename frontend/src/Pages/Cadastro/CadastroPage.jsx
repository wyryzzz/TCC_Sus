import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, User, Mail, Lock, UserCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import api from "../../api";
import logo from "../../assets/images/logo.png";
import "./CadastroPage.scss";

export default function CadastroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo_usuario: "paciente",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    senhaMinLength: false,
    senhasMatch: false,
  });

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

    setLoading(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        tipo_usuario: form.tipo_usuario,
      };

      // Primeiro, criar a conta de usuário
      await api.post("/criar/conta", payload);

      // Fazer login automático para obter token
      const loginPayload = {
        email: form.email,
        senha: form.senha,
      };

      const loginResponse = await api.post("/login", loginPayload);

      // Salvar token e usuário no localStorage
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("usuario", JSON.stringify(loginResponse.data.usuario));

      // Se for paciente, cadastrar na tabela pacientes com o token
      if (form.tipo_usuario === "paciente") {
        const pacientePayload = {
          nome: form.nome,
          email: form.email,
          cpf: null, // CPF opcional no cadastro público
          data_nascimento: null,
          endereco: null,
          telefone: null,
          cartao_sus: null,
          tipo_sanguineo: null,
          alergias: null,
          contato_emergencia: null,
        };

        await api.post("/pacientes", pacientePayload);
      }

      // Se for médico, cadastrar na tabela medicos com o token
      if (form.tipo_usuario === "medico") {
        try {
          // Primeiro, tentar criar funcionário
          const funcionarioPayload = {
            nome: form.nome,
            email: form.email,
            cpf: null, // CPF opcional
            departamento: "Medicina",
            salario: 0, // Será definido depois
            cargo: "Médico",
            telefone: null,
            endereco: null,
            funcionario_ativo: true,
            data_admissao: new Date().toISOString().split("T")[0],
          };

          let idFuncionario = null;
          try {
            const resFuncionario = await api.post("/funcionarios", funcionarioPayload);
            idFuncionario = resFuncionario.data.id;
          } catch (erroFuncionario) {
            console.warn("Funcionário já existe ou erro ao criar:", erroFuncionario.message);
            // Tentar buscar funcionário existente pelo email
            try {
              const resBusca = await api.get("/filtrarNome/funcionarios", { params: { nome: form.nome } });
              if (resBusca.data.dados && resBusca.data.dados.length > 0) {
                idFuncionario = resBusca.data.dados[0].id;
              }
            } catch (erroBusca) {
              console.warn("Erro ao buscar funcionário existente:", erroBusca.message);
            }
          }

          // Depois, tentar cadastrar médico
          const medicoPayload = {
            id_funcionario: idFuncionario,
            nome: form.nome,
            email: form.email,
            telefone: null,
            salario: 0,
            crm: null,
            id_especialidade: null,
          };

          await api.post("/medicos", medicoPayload);
        } catch (erroMedico) {
          console.warn("Erro ao criar médico:", erroMedico.message);
          // Médico pode já existir, não falhar o cadastro
        }
      }

      toast.success("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => {
        if (form.tipo_usuario === "paciente") {
          navigate("/PacientesPage"); // Redirecionar para página do paciente
        } else if (form.tipo_usuario === "admin") {
          navigate("/dashboard"); // Admin vai para dashboard
        } else if (form.tipo_usuario === "medico") {
          navigate("/medicospage"); // Médico vai para página de médicos
        } else {
          navigate("/login"); // Fallback para login
        }
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
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            <span>Voltar para a página inicial</span>
          </Link>

          <div className="cadastro-header">
            <div className="logo-wrapper">
              <img src={logo} alt="Logo SUS Digital" className="logo-img" />
            </div>
            <h1 className="cadastro-title">Criar Conta</h1>
            <p className="cadastro-subtitle">
              Preencha os dados abaixo para começar sua jornada na saúde digital
            </p>
          </div>

          <form onSubmit={handleSubmit} className="cadastro-form">
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
                placeholder="Digite seu nome completo"
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
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

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
                  className={`form-input ${validation.senhaMinLength ? 'valid' : ''}`}
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
                <div className={`validation-message ${validation.senhaMinLength ? 'success' : 'error'}`}>
                  {validation.senhaMinLength ? '✓' : '✗'} Mínimo de 6 caracteres
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
                  className={`form-input ${validation.senhasMatch && form.confirmarSenha ? 'valid' : form.confirmarSenha ? 'invalid' : ''}`}
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
                <div className={`validation-message ${validation.senhasMatch ? 'success' : 'error'}`}>
                  {validation.senhasMatch ? '✓' : '✗'} As senhas devem coincidir
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !validation.senhaMinLength || !validation.senhasMatch}
              className="cadastro-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Criando conta...
                </>
              ) : (
                <>
                  Criar Conta
                  <ArrowLeft size={20} className="arrow-icon" />
                </>
              )}
            </button>
          </form>

          <div className="cadastro-footer">
            <p className="footer-text">
              Já tem uma conta?{" "}
              <Link to="/login" className="footer-link">
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
