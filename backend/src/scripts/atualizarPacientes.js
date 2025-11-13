import { connection } from '../config/connection.js';

async function atualizarPacientes() {
  try {
    console.log('Verificando pacientes existentes...');

    // Verificar quantos usuários do tipo 'paciente' existem
    const [usuarios] = await connection.query(
      "SELECT id, nome, email FROM usuario WHERE tipo_usuario = 'paciente'"
    );

    console.log(`Encontrados ${usuarios.length} usuários do tipo paciente`);

    // Verificar quantos já estão na tabela pacientes
    const [pacientesExistentes] = await connection.query(
      "SELECT email FROM pacientes WHERE email IS NOT NULL"
    );

    const emailsExistentes = pacientesExistentes.map(p => p.email);

    // Filtrar usuários que ainda não estão na tabela pacientes
    const usuariosParaInserir = usuarios.filter(u => !emailsExistentes.includes(u.email));

    console.log(`${usuariosParaInserir.length} pacientes serão inseridos`);

    if (usuariosParaInserir.length > 0) {
      // Inserir pacientes
      const valores = usuariosParaInserir.map(u => [u.nome, u.email, 'ativo']);
      const placeholders = valores.map(() => '(?, ?, ?)').join(', ');

      const query = `
        INSERT INTO pacientes (nome, email, status)
        VALUES ${placeholders}
      `;

      const valoresFlat = valores.flat();
      await connection.query(query, valoresFlat);

      console.log(`${usuariosParaInserir.length} pacientes inseridos com sucesso!`);
    } else {
      console.log('Todos os usuários pacientes já estão na tabela pacientes.');
    }

  } catch (erro) {
    console.error('Erro ao atualizar pacientes:', erro);
  } finally {
    await connection.end();
  }
}

atualizarPacientes();
