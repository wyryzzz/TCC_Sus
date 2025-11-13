import { connection } from '../config/connection.js';

export async function listarPrescricoesPorPaciente(pacienteId) {
  const [linhas] = await connection.query(
    `SELECT * FROM prescricoes WHERE paciente_id = ? ORDER BY inicio DESC`,
    [pacienteId]
  );
  return linhas;
}

export async function criarPrescricao(prescricoes) {
  const comando = `
    INSERT INTO prescricoes (paciente_id, medicamento, dosagem, frequencia, inicio, fim, observacoes, medico_nome)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [info] = await connection.query(comando, [
    prescricoes.paciente_id,
    prescricoes.medicamento,
    prescricoes.dosagem,
    prescricoes.frequencia,
    prescricoes.inicio,
    prescricoes.fim,
    prescricoes.observacoes,
    prescricoes.medico_nome
  ]);
  return info.insertId;
}




