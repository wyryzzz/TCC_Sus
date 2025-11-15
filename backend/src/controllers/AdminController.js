import { Router } from "express";
import { getAuthentication, requireRole } from '../utils/jwt.js';
import * as usuarioService from '../services/UsuarioService.js';
import { criarFuncionarioService } from '../services/FuncionarioService.js';
import { criarMedicoService } from '../services/MedicoService.js';
import { connection } from '../config/connection.js';

const endpoints = Router();
const autenticador = getAuthentication();
const adminOnly = requireRole('admin');

// Rota para cadastrar administrador (apenas admins)
endpoints.post('/admin/cadastrar/administrador', autenticador, adminOnly, async (req, res) => {
  try {
    const dados = req.body;

    // Validar campos obrigatórios
    if (!dados.nome || !dados.email || !dados.senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    // Criar usuário com role admin
    const usuarioDados = {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      tipo_usuario: 'admin'
    };

    const resultadoUsuario = await usuarioService.criarUsuarioService(usuarioDados, true);

    res.status(201).json({
      mensagem: "Administrador cadastrado com sucesso!",
      id: resultadoUsuario.id
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Rota para cadastrar médico (apenas admins)
endpoints.post('/admin/cadastrar/medico', autenticador, adminOnly, async (req, res) => {
  try {
    const dados = req.body;

    // Validar campos obrigatórios
    if (!dados.nome || !dados.email || !dados.senha || !dados.crm) {
      return res.status(400).json({ erro: 'Nome, email, senha e CRM são obrigatórios.' });
    }

    // 1. Criar usuário com role medico
    const usuarioDados = {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      tipo_usuario: 'medico'
    };

    const resultadoUsuario = await usuarioService.criarUsuarioService(usuarioDados, true);

    // 2. Criar funcionário
    const funcionarioDados = {
      nome: dados.nome,
      email: dados.email,
      cpf: dados.cpf || null,
      departamento: dados.departamento || 'Medicina',
      salario: dados.salario || 0,
      cargo: dados.cargo || 'Médico',
      telefone: dados.telefone || null,
      endereco: dados.endereco || null,
      funcionario_ativo: true,
      data_admissao: dados.data_admissao || new Date().toISOString().split('T')[0]
    };

    const resultadoFuncionario = await criarFuncionarioService(funcionarioDados);
    const idFuncionario = resultadoFuncionario.id;

    // 3. Criar médico
    const medicoDados = {
      id_funcionario: idFuncionario,
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone || null,
      salario: dados.salario || 0,
      crm: dados.crm,
      id_especialidade: dados.id_especialidade || null
    };

    const resultadoMedico = await criarMedicoService(medicoDados);

    // 4. Atualizar médico com usuario_id
    await connection.query(
      `UPDATE medicos SET usuario_id = ? WHERE id = ?`,
      [resultadoUsuario.id, resultadoMedico.insertId]
    );

    res.status(201).json({
      mensagem: "Médico cadastrado com sucesso!",
      id_usuario: resultadoUsuario.id,
      id_funcionario: idFuncionario,
      id_medico: resultadoMedico.insertId
    });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

export default endpoints;

