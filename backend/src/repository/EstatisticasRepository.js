import { connection } from "../config/connection.js";

export async function contarPacientes() {
  const [resultados] = await connection.query(`SELECT COUNT(*) as total FROM pacientes`);
  return resultados[0].total || 0;
}

export async function contarFuncionariosAtivos() {
  const [resultados] = await connection.query(`SELECT COUNT(*) as total FROM funcionarios WHERE funcionario_ativo = 1`);
  return resultados[0].total || 0;
}

export async function contarConsultasHoje() {
  const [resultados] = await connection.query(`
    SELECT COUNT(*) as total 
    FROM consultas 
    WHERE DATE(data_hora) = CURDATE()
  `);
  return resultados[0].total || 0;
}

export async function contarMedicamentos() {
  const [resultados] = await connection.query(`SELECT COUNT(*) as total FROM Medicamentos`);
  return resultados[0].total || 0;
}

export async function consultasPorMes(limiteMeses = 6) {
  const [resultados] = await connection.query(`
    SELECT 
      mes,
      consultas,
      pacientes
    FROM consultas_por_mes
    ORDER BY id DESC
    LIMIT ?
  `, [limiteMeses]);

  return resultados;
}


export async function consultasPorStatus() {
  const [resultados] = await connection.query(`
    SELECT status, COUNT(*) as total
    FROM consultas
    GROUP BY status
  `);
  return resultados;
}

export async function pacientesPorIdade() {
  const [resultados] = await connection.query(`
    SELECT 
      faixa_etaria AS faixa,
      quantidade
    FROM pacientes_por_idade
    ORDER BY id ASC
  `);
  return resultados;
}


export async function especialidadesPorFuncionarios() {
  const [resultados] = await connection.query(`
    SELECT 
      COALESCE(departamento, 'Outros') as especialidade,
      COUNT(*) as total
    FROM funcionarios
    WHERE funcionario_ativo = 1
    GROUP BY departamento
    ORDER BY total DESC
  `);
  return resultados;
}

export async function medicamentosPorConsumo() {
  const [resultados] = await connection.query(`
    SELECT 
      medicamento AS nome,
      estoque,
      consumo
    FROM medicamentos_consumo
    ORDER BY consumo DESC
    LIMIT 10
  `);
  return resultados;
}


export async function funcionariosPorTipo() {
  const [resultados] = await connection.query(`
    SELECT 
      cargo,
      COUNT(*) as total
    FROM funcionarios
    WHERE funcionario_ativo = 1
    GROUP BY cargo
  `);
  return resultados;
}





