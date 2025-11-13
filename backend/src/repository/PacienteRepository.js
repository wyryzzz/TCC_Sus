import { connection } from '../config/connection.js';


export async function inserirPaciente(paciente) {
  const comando = `
    INSERT INTO pacientes (
      nome, data_nascimento, cpf, email, endereco,
      telefone, cartao_sus, tipo_sanguineo, alergias,
      contato_emergencia
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const [info] = await connection.query(comando, [
    paciente.nome,
    paciente.data_nascimento || null,
    paciente.cpf || null,
    paciente.email,
    paciente.endereco || null,
    paciente.telefone || null,
    paciente.cartao_sus || null,
    paciente.tipo_sanguineo || null,
    paciente.alergias || null,
    paciente.contato_emergencia || null
  ]);

  return info.insertId;
}


export async function listarPacientes() {
  const comando = `SELECT * FROM pacientes ORDER BY nome ASC;`;
  const [linhas] = await connection.query(comando);
  return linhas;
}


export async function buscarPacientePorNome(nome) {
  const comando = `
    SELECT * FROM pacientes
    WHERE nome LIKE ?;
  `;
  const [linhas] = await connection.query(comando, [`%${nome}%`]);
  return linhas;
}


export async function buscarPacientePorCpf(cpf) {
  const comando = `
    SELECT * FROM pacientes
    WHERE cpf = ?;
  `;
  const [linhas] = await connection.query(comando, [cpf]);
  return linhas[0];
}


export async function atualizarPaciente(id, paciente) {
  const comando = `
    UPDATE pacientes
    SET nome = ?, cpf = ?, cartao_sus = ?, email = ?, tipo_sanguineo = ?,
        status =?
    WHERE id = ?;
  `;

  const [info] = await connection.query(comando, [
    paciente.nome,
    paciente.cpf,
    paciente.cartao_sus,
    paciente.email,
    paciente.tipo_sanguineo,
    paciente.status,
    id
  ]);

  return info.affectedRows;
}

export async function buscarPacientePorEmail(email) {
  const comando = `
    SELECT * FROM pacientes
    WHERE email = ?;
  `;
  const [linhas] = await connection.query(comando, [email]);
  return linhas[0];
}

export async function deletarPaciente(id) {
  const comando = `DELETE FROM pacientes WHERE id = ?;`;
  const [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}
