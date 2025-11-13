import { connection } from "../config/connection.js";

export async function CadastrarMedico(NovosDados) {
    // Verificar se o email já existe
    let [existente] = await connection.query(
        `SELECT id FROM medicos WHERE email = ?`, [NovosDados.email]
    );

    if (existente.length > 0) {
        throw new Error('Email já cadastrado para médico.');
    }

    const [resultados] = await connection.query(
        `INSERT INTO medicos (id_funcionario, nome, email, telefone, salario, crm, id_especialidade)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            NovosDados.id_funcionario,
            NovosDados.nome,
            NovosDados.email,
            NovosDados.telefone || null,
            NovosDados.salario || 0,
            NovosDados.crm || null,
            NovosDados.id_especialidade || null
        ]
    );
    return resultados;
}

export async function ListarMedicos() {
    const [resultados] = await connection.query(`
        SELECT
            m.id,
            m.id_funcionario,
            m.nome,
            m.email,
            m.telefone,
            m.salario,
            m.crm,
            m.id_especialidade,
            f.cargo,
            f.departamento
        FROM medicos m
        LEFT JOIN funcionarios f ON m.id_funcionario = f.id
        ORDER BY m.nome ASC
    `);
    return resultados;
}

export async function BuscarMedicoPorEmail(email) {
    const [resultados] = await connection.query(
        `SELECT
            m.id,
            m.id_funcionario,
            m.nome,
            m.email,
            m.telefone,
            m.salario,
            m.crm,
            m.id_especialidade,
            f.cargo,
            f.departamento
        FROM medicos m
        LEFT JOIN funcionarios f ON m.id_funcionario = f.id
        WHERE m.email = ?`, [email]
    );
    return resultados[0];
}

export async function BuscarMedicoPorId(id) {
    const [resultados] = await connection.query(
        `SELECT * FROM medicos WHERE id = ?`, [id]
    );
    return resultados[0];
}

export async function BuscarMedicoPorNome(nome) {
    const [resultados] = await connection.query(
        `SELECT * FROM medicos WHERE nome LIKE ?`, [`%${nome}%`]
    );
    return resultados;
}

export async function AtualizarMedico(NovosDados, id) {
    const [resultados] = await connection.query(
        `UPDATE medicos
         SET id_funcionario = ?,
             nome = ?,
             email = ?,
             telefone = ?,
             salario = ?,
             crm = ?,
             id_especialidade = ?
         WHERE id = ?`,
        [
            NovosDados.id_funcionario,
            NovosDados.nome,
            NovosDados.email,
            NovosDados.telefone,
            NovosDados.salario,
            NovosDados.crm,
            NovosDados.id_especialidade,
            id
        ]
    );
    return resultados.affectedRows;
}

export async function DeletarMedico(id) {
    const [resultados] = await connection.query(
        `DELETE FROM medicos WHERE id = ?`, [id]
    );
    return resultados;
}
