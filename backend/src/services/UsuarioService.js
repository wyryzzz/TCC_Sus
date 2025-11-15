import { CriarCredenciais, validarCredenciais } from "../repository/UsuarioRepository.js";

export async function criarUsuarioService(dados, permitirAdminMedico = false) {
  // Validações básicas
  if (!dados.nome || !dados.email || !dados.senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(dados.email)) {
    throw new Error("Email inválido.");
  }

  // Validação de senha
  if (dados.senha.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  // Se não permitir admin/medico, forçar tipo_usuario para paciente
  if (!permitirAdminMedico) {
    dados.tipo_usuario = "paciente";
  } else {
    // Se permitir, validar que o tipo_usuario é válido
    const tiposValidos = ["admin", "medico", "paciente", "user"];
    if (dados.tipo_usuario && !tiposValidos.includes(dados.tipo_usuario)) {
      throw new Error("Tipo de usuário inválido.");
    }
  }

  try {
    const resultado = await CriarCredenciais(dados);
    return {
      id: resultado.insertId,
      mensagem: "Usuário criado com sucesso!"
    };
  } catch (err) {
    throw new Error(err.message || "Erro ao criar usuário.");
  }
}

export async function validarLoginService(email, senha) {
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios.");
  }

  try {
    const dados = await validarCredenciais(email, senha);
    if (!dados) {
      throw new Error("Credenciais inválidas.");
    }

    return {
      id: dados.id,
      nome: dados.nome || dados.nome_usuario,
      email: dados.email,
      role: dados.tipo_usuario || dados.nivel_acesso || "user"
    };
  } catch (err) {
    throw new Error(err.message || "Erro ao validar credenciais.");
  }
}

