import {CadastrarFuncionarios,ListarFuncionarios,FiltrarFuncionarios,ListarFuncionariosCPF,AtualizarFuncionarios, DeletarFuncionarios,} from "../repository/FuncionarioRepository.js";

export async function criarFuncionarioService(dados) {
  if (!dados.nome || !dados.email) {
    throw new Error("Nome e email são obrigatórios.");
  }

  try {
    let resultado = await CadastrarFuncionarios(dados);
    return {
      message: "Funcionário cadastrado com sucesso!",
      id: resultado.insertId,
    };
  } 
  
  catch (erro) {
    console.error("Erro ao cadastrar funcionário:", erro);
    throw new Error("Erro no cadastro de funcionário.");
  }
}

export async function listarFuncionariosService() {
  try {
    let [resultados] = await ListarFuncionarios();
    return resultados;
  } 
  
  catch (erro) {
    console.error("Erro ao listar funcionários:", erro);
    throw new Error("Erro ao buscar funcionários.");
  }
}

export async function buscarFuncionarioPorNomeService(nome) {
  if (!nome) throw new Error("O nome é obrigatório para a busca.");

  try {
    let resultados = await FiltrarFuncionarios(nome);
    return resultados;
  } 
  
  catch (erro) {
    console.error("Erro ao buscar funcionário:", erro);
    throw new Error("Erro na busca de funcionário por nome.");
  }
}

export async function buscarFuncionarioPorCPFService(cpf) {
  if (!cpf) throw new Error("O CPF é obrigatório para a busca.");

  try {
    let [resultados] = await ListarFuncionariosCPF(cpf);
    return resultados;
  } 
  
  catch (erro) {
    console.error("Erro ao buscar por CPF:", erro);
    throw new Error("Erro na busca de funcionário por CPF.");
  }
}

export async function atualizarFuncionarioService(id, novosDados) {
  if (!id) throw new Error("O ID do funcionário é obrigatório.");

  try {
    let linhasAfetadas = await AtualizarFuncionarios(novosDados, id);
    if (linhasAfetadas === 0) {
      throw new Error("Funcionário não encontrado para atualização.");
    }

    return { message: "Funcionário atualizado com sucesso!" };
  } 
  
  catch (erro) {
    console.error("Erro ao atualizar funcionário:", erro);
    throw new Error("Erro na atualização de funcionário.");
  }
}

export async function deletarFuncionarioService(id) {
  if (!id) throw new Error("O ID do funcionário é obrigatório.");

  try {
    let resultado = await DeletarFuncionarios(id);
    if (resultado.affectedRows === 0) {
      throw new Error("Funcionário não encontrado.");
    }

    return { message: "Funcionário excluído com sucesso!" };
  } 
  
  catch (erro) {
    console.error("Erro ao deletar funcionário:", erro);
    throw new Error("Erro na exclusão de funcionário.");
  }
}
