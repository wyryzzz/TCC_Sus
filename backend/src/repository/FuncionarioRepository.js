import { connection } from "../config/connection.js";

export async function CadastrarFuncionarios(NovosDados) {
    // Verificar se o email já existe
    let [existente] = await connection.query(
        `SELECT id FROM funcionarios WHERE email = ?`, [NovosDados.email]
    );

    if (existente.length > 0) {
        throw new Error('Email já cadastrado para funcionário.');
    }

    let [resultados] =
        await connection.query(
            `INSERT INTO funcionarios (nome, cpf, departamento, salario, cargo, email, telefone,
            endereco, funcionario_ativo, data_admissao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [NovosDados.nome, NovosDados.cpf, NovosDados.departamento,
            NovosDados.salario, NovosDados.cargo, NovosDados.email, NovosDados.telefone,
            NovosDados.endereco || null, NovosDados.funcionario_ativo, NovosDados.date || NovosDados.data_admissao
            ]
        )

    return resultados;
}

export async function ListarFuncionarios() {
    let [resultados] =
        await connection.query(
            `SELECT * FROM funcionarios`
        )

    return resultados
}

export async function FiltrarFuncionarios(nome) {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM funcionarios
            WHERE nome = ?`, [`%${nome}%`]
        )

    return resultados
}

export async function ListarFuncionariosCPF(cpf) {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM funcionarios
            WHERE cpf = ?`, [cpf]
        )

    return resultados
}

export async function AtualizarFuncionarios(NovosDados, id) {
    let [resultados] =
        await connection.query(
            `UPDATE funcionarios
            SET nome = ?,
            cpf = ?,
            departamento = ?,
            salario = ?,
            cargo = ?,
            email = ?,
            telefone = ?,
            endereco = ?,
            funcionario_ativo = ?,
            data_admissao = ?
            WHERE id = ?`,
            [NovosDados.nome, NovosDados.cpf, NovosDados.departamento, NovosDados.salario,
            NovosDados.cargo, NovosDados.email, NovosDados.telefone, NovosDados.endereco || null,
            NovosDados.funcionario_ativo, NovosDados.data_admissao, id
            ]
        )

    return resultados.affectedRows;
}

export async function DeletarFuncionarios(id) {
    let [resultados] =
        await connection.query(
            `DELETE FROM funcionarios
            WHERE id = ?`, [id]
        )

    return resultados
}
