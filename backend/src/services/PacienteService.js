import * as pacienteRepo from '../repository/PacienteRepository.js';

export async function inserirPaciente(paciente) {
  if (!paciente.nome || !paciente.email) {
    throw new Error('Nome e e-mail são obrigatórios.');
  }

  // Verificar CPF apenas se fornecido
  if (paciente.cpf) {
    const existente = await pacienteRepo.buscarPacientePorCpf(paciente.cpf);
    if (existente) throw new Error('Já existe um paciente com esse CPF.');
  }

  return await pacienteRepo.inserirPaciente(paciente);
}

export async function listarPacientes() {
  return await pacienteRepo.listarPacientes();
}

export async function buscarPacientePorNome(nome) {
  return await pacienteRepo.buscarPacientePorNome(nome);
}

export async function buscarPacientePorCpf(cpf) {
  const paciente = await pacienteRepo.buscarPacientePorCpf(cpf);
  if (!paciente) throw new Error('Paciente não encontrado.');
  return paciente;
}

export async function atualizarPaciente(id, dados) {
  const linhas = await pacienteRepo.atualizarPaciente(id, dados);
  if (linhas === 0) throw new Error('Paciente não encontrado.');
  return linhas;
}

export async function buscarPacientePorEmail(email) {
  const paciente = await pacienteRepo.buscarPacientePorEmail(email);
  if (!paciente) throw new Error('Paciente não encontrado.');
  return paciente;
}

export async function deletarPaciente(id) {
  const linhas = await pacienteRepo.deletarPaciente(id);
  if (linhas === 0) throw new Error('Paciente não encontrado.');
  return linhas;
}
