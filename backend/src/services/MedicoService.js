import {
    CadastrarMedico,
    ListarMedicos,
    BuscarMedicoPorId,
    BuscarMedicoPorNome,
    AtualizarMedico,
    DeletarMedico
} from "../repository/MedicosRepository.js";

export async function criarMedicoService(dados) {
    if (!dados.nome || !dados.email)
        throw "Campos obrigatórios: nome e e-mail.";

    return await CadastrarMedico(dados);
}

export async function listarMedicosService() {
    return await ListarMedicos();
}

export async function buscarMedicoPorIdService(id) {
    const medico = await BuscarMedicoPorId(id);
    if (!medico) throw "Médico não encontrado.";
    return medico;
}

export async function buscarMedicoPorNomeService(nome) {
    return await BuscarMedicoPorNome(nome);
}

export async function atualizarMedicoService(dados, id) {
    const linhasAfetadas = await AtualizarMedico(dados, id);
    if (linhasAfetadas === 0) throw "Nenhum médico encontrado para atualizar.";
    return linhasAfetadas;
}

export async function deletarMedicoService(id) {
    const linhasAfetadas = await DeletarMedico(id);
    if (linhasAfetadas === 0) throw "Médico não encontrado para deletar.";
    return linhasAfetadas;
}

export async function buscarMedicoPorEmailService(email) {
    const medico = await BuscarMedicoPorEmail(email);
    // Não lançar erro se médico não for encontrado, retornar null
    return medico || null;
}
