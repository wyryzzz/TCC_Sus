import * as ubsRepo from '../repository/UnidadeSaudeRepository.js';

export async function inserirUbs(nome, endereco) {
  if (!nome) throw new Error('O nome da unidade é obrigatório.');
  return await ubsRepo.inserirUbs(nome, endereco);
}

export async function listarUbs() {
  return await ubsRepo.listarUbs();
}

export async function buscarUbsPorNome(nome) {
  const lista = await ubsRepo.buscarUbsPorNome(nome);
  if (lista.length === 0) throw new Error('Nenhuma unidade encontrada com esse nome.');
  return lista;
}

export async function atualizarUbs(id, nome, endereco) {
  const linhas = await ubsRepo.atualizarUbs(id, nome, endereco);
  if (linhas === 0) throw new Error('Unidade não encontrada.');
  return linhas;
}

export async function deletarUbs(id) {
  const linhas = await ubsRepo.deletarUbs(id);
  if (linhas === 0) throw new Error('Unidade não encontrada.');
  return linhas;
}
