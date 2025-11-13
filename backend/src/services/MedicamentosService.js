import { 
    ListarMedicamentos,
    ListarMedicamentosNome,
    ListarMedicamentosFornecedor,
    ListarMedicamentosPrincipio,
    InserirMedicamentos,
    AtualizarMedicamentos,
    DeletarMedicamentos
} from "../repository/MedicamentosRepository.js";

export async function serviceListarMedicamentos() {
    try {
        return await ListarMedicamentos();
    } catch (error) {
        throw new Error(`Erro ao listar medicamentos: ${error.message}`);
    }
}

export async function serviceListarMedicamentosNome(nome) {
    try {
        return await ListarMedicamentosNome(nome);
    } catch (error) {
        throw new Error(`Erro ao filtrar medicamentos por nome: ${error.message}`);
    }
}

export async function serviceInserirMedicamentos(dados) {
    try {
        return await InserirMedicamentos(dados);
    } catch (error) {
        throw new Error(`Erro ao inserir medicamento: ${error.message}`);
    }
}

export async function serviceAtualizarMedicamentos(id, dados) {
    try {
        return await AtualizarMedicamentos(dados, id);
    } catch (error) {
        throw new Error(`Erro ao atualizar medicamento: ${error.message}`);
    }
}

export async function serviceDeletarMedicamentos(id) {
    try {
        return await DeletarMedicamentos(id);
    } catch (error) {
        throw new Error(`Erro ao deletar medicamento: ${error.message}`);
    }
}
