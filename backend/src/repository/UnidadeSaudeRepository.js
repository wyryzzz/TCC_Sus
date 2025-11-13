import { connection } from '../config/connection.js';


export async function inserirUbs(nome, endereco) {
  const comando = `
    INSERT INTO unidades_saude (nome, endereco)
    VALUES (?, ?);
  `;

  const [info] = await connection.query(comando, [nome, endereco]);
  return info.insertId;
}


export async function listarUbs() {
  const comando = `SELECT * FROM unidades_saude ORDER BY nome ASC;`;
  const [linhas] = await connection.query(comando);
  return linhas;
}


export async function buscarUbsPorNome(nome) {
  const comando = `
    SELECT * FROM unidades_saude
    WHERE nome LIKE ?;
  `;
  const [linhas] = await connection.query(comando, [`%${nome}%`]);
  return linhas;
}


export async function atualizarUbs(id, nome, endereco) {
  const comando = `
    UPDATE unidades_saude
    SET nome = ?, endereco = ?
    WHERE id = ?;
  `;
  const [info] = await connection.query(comando, [nome, endereco, id]);
  return info.affectedRows;
}


export async function deletarUbs(id) {
  const comando = `DELETE FROM unidades_saude WHERE id = ?;`;
  const [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}
