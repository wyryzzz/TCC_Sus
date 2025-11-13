import { connection } from "../config/connection.js";

export async function ListarMedicamentos() {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM medicamentos`
        )

    return resultados;
}

export async function ListarMedicamentosNome(nome) {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM medicamentos 
            WHERE nome = ?`, [nome]
        )

    return resultados;
}

export async function ListarMedicamentosFornecedor(fornecedor) {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM medicamentos 
            WHERE fornecedor = ?`, [fornecedor]
        )

    return resultados;
}

export async function ListarMedicamentosPrincipio(principio_ativo) {
    let [resultados] = 
        await connection.query(
            `SELECT * FROM medicamentos
            WHERE principio_ativo = ?`, [principio_ativo]
        )

    return resultados;
}

export async function InserirMedicamentos(NovosDados) {
    let [resultados] = 
        await connection.query(
            `INSERT INTO medicamentos 
            (nome, principio_ativo, dosagem_forma, estoque, fornecedor, validade, status )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [NovosDados.nome, NovosDados.principio_ativo, NovosDados.dosagem_forma, NovosDados.estoque,
                NovosDados.fornecedor, NovosDados.validade, NovosDados.status
            ]
        )

    return resultados;
}

export async function AtualizarMedicamentos(NovosDados, id) {
    const [resultados] = await connection.query(
        `UPDATE medicamentos
         SET nome = ?, 
             dosagem_forma = ?, 
             estoque = ?, 
             fornecedor = ?, 
             validade = ?, 
             status = ?
         WHERE id = ?`,
        [
            NovosDados.nome,
            NovosDados.dosagem_forma,
            NovosDados.estoque,
            NovosDados.fornecedor,
            NovosDados.validade,
            NovosDados.status,
            id
        ]
    );

    return resultados;
}

export async function DeletarMedicamentos(id) {
    let [resultados] = 
        await connection.query(
            `DELETE FROM medicamentos
            WHERE id = ?`, [id]
        )
}