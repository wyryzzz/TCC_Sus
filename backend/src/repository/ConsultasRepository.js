import { connection } from "../config/connection.js";

export async function ListarConsultas() {
  const [consultas] = await connection.query(`
    SELECT
      consultas.id,
      consultas.paciente_id,
      consultas.funcionario_id,
      consultas.data_hora,
      consultas.tipo_consulta,
      consultas.unidade,
      consultas.status,
      pacientes.nome AS nome_paciente,
      medicos.nome AS nome_funcionario,
      medicos.crm AS crm_funcionario
    FROM consultas
    JOIN pacientes ON consultas.paciente_id = pacientes.id
    LEFT JOIN medicos ON consultas.funcionario_id = medicos.id_funcionario
    ORDER BY consultas.data_hora DESC
  `);
  return consultas;
}

export async function BuscarConsultaPorPaciente(pacienteId) {
  const [consultas] = await connection.query(`
    SELECT
      consultas.id,
      consultas.paciente_id,
      consultas.funcionario_id,
      consultas.data_hora,
      consultas.tipo_consulta,
      consultas.unidade,
      consultas.status,
      medicos.nome AS nome_funcionario,
      medicos.crm AS crm_funcionario
    FROM consultas
    LEFT JOIN medicos ON consultas.funcionario_id = medicos.id_funcionario
    WHERE consultas.paciente_id = ?
    ORDER BY consultas.data_hora DESC
  `, [pacienteId]);
  return consultas;
}

export async function BuscarConsultaPorFuncionario(funcionarioId) {
  const [consultas] = await connection.query(`
    SELECT
      consultas.id,
      consultas.paciente_id,
      consultas.funcionario_id,
      consultas.data_hora,
      consultas.tipo_consulta,
      consultas.unidade,
      consultas.status,
      pacientes.nome AS nome_paciente,
      (
        SELECT GROUP_CONCAT(
          CONCAT(
            'Medicamento: ', prescricoes.medicamento,
            ' | Dosagem: ', prescricoes.dosagem,
            ' | Frequência: ', prescricoes.frequencia,
            ' | Início: ', DATE_FORMAT(prescricoes.inicio, '%d/%m/%Y'),
            CASE WHEN prescricoes.fim IS NOT NULL THEN CONCAT(' | Fim: ', DATE_FORMAT(prescricoes.fim, '%d/%m/%Y')) ELSE '' END,
            CASE WHEN prescricoes.observacoes IS NOT NULL AND prescricoes.observacoes != '' THEN CONCAT(' | Obs: ', prescricoes.observacoes) ELSE '' END
          ) SEPARATOR ' || ')
        FROM prescricoes
        WHERE prescricoes.paciente_id = consultas.paciente_id
        AND prescricoes.medico_nome = (SELECT nome FROM medicos WHERE id_funcionario = consultas.funcionario_id LIMIT 1)
        ORDER BY prescricoes.inicio DESC
      ) AS prescricoes
    FROM consultas
    JOIN pacientes ON consultas.paciente_id = pacientes.id
    WHERE consultas.funcionario_id = ?
    ORDER BY consultas.data_hora DESC
  `, [funcionarioId]);
  return consultas;
}

export async function BuscarConsultaPorUnidade(unidade) {
  const [consultas] = await connection.query(`
    SELECT
      consultas.id,
      consultas.paciente_id,
      consultas.funcionario_id,
      consultas.data_hora,
      consultas.tipo_consulta,
      consultas.unidade,
      consultas.status,
      pacientes.nome AS nome_paciente,
      medicos.nome AS nome_funcionario,
      medicos.crm AS crm_funcionario
    FROM consultas
    INNER JOIN pacientes ON consultas.paciente_id = pacientes.id
    LEFT JOIN medicos ON consultas.funcionario_id = medicos.id_funcionario
    WHERE consultas.unidade LIKE ?
    ORDER BY consultas.data_hora DESC
  `, [`%${unidade}%`]);
  return consultas;
}

export async function CriarConsulta(dadosConsulta) {
  const { paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, status } = dadosConsulta;

  let statusNormalizado = status || 'Agendada';
  if (statusNormalizado.toLowerCase() === 'agendada') statusNormalizado = 'Agendada';
  if (statusNormalizado.toLowerCase() === 'realizada' || statusNormalizado.toLowerCase() === 'concluída') statusNormalizado = 'Concluída';

  const [resultado] = await connection.query(`
    INSERT INTO consultas (paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, statusNormalizado]);

  return { id: resultado.insertId, ...dadosConsulta };
}

export async function AtualizarConsulta(idConsulta, dadosConsulta) {
  const { paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, status } = dadosConsulta;
  
  let statusNormalizado = status || 'Agendada';
  if (statusNormalizado.toLowerCase() === 'agendada') statusNormalizado = 'Agendada';
  if (statusNormalizado.toLowerCase() === 'realizada' || statusNormalizado.toLowerCase() === 'concluída') statusNormalizado = 'Concluída';

  const [resultado] = await connection.query(`
    UPDATE consultas
    SET paciente_id = ?, funcionario_id = ?, data_hora = ?, tipo_consulta = ?, unidade = ?, status = ?
    WHERE id = ?
  `, [paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, statusNormalizado, idConsulta]);

  return resultado.affectedRows > 0;
}

export async function DeletarConsulta(idConsulta) {
  const [resultado] = await connection.query(`
    DELETE FROM consultas WHERE id = ?
  `, [idConsulta]);

  return resultado.affectedRows > 0;
}
