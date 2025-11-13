import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import api from "../../api";
import logo from "../../assets/images/logo.png";
import "./LoginPage.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function redirecionar(role) {
    if (role === "admin") {
      navigate("/dashboard");
    } 
    
    else if (role === "paciente") {
      navigate("/PacientesPage");
    } 
    
    else if (role === "medico") {
      navigate("/medicospage");
    } 
    
    else {
      navigate("/");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    if (token && usuario) {
      const userData = JSON.parse(usuario);
      redirecionar(userData.role);
    }
  }, []);

  async function entrar(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await api.post("/login", { email, senha });

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      toast.success("Login realizado com sucesso!");
      redirecionar(data.usuario.role);
    } 
    
    catch (erro) {
      console.error("Erro no login:", erro);
      toast.error("Falha no login. Verifique suas credenciais.");
    } 
    
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <Link to="/" className="back-link">
            <ArrowRight size={16} className="back-icon" />
            <span>Voltar</span>
          </Link>
          
          <div className="login-header">
            <div className="logo-wrapper">
              <img src={logo} alt="Logo SUS Digital" className="logo-img" />
            </div>
            <h1 className="login-title">
              Bem-vindo de volta!
            </h1>
            <p className="login-subtitle">
              Acesse sua conta para continuar gerenciando sua saúde
            </p>
          </div>

          <form onSubmit={entrar} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <Mail size={18} className="label-icon" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={18} className="label-icon" />
                Senha
              </label>
              <div className="password-wrapper">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="password-toggle"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Entrando...
                </>
              ) : (
                <>
                  Acessar Sistema
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="footer-link">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
