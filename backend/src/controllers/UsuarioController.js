import { Router } from "express";
import { generateToken } from '../utils/jwt.js';
import * as usuarioService from '../services/UsuarioService.js';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const autenticador = getAuthentication();

// Rota pública - apenas para cadastro de pacientes
endpoints.post('/criar/conta', async (req, res) => {
  try {
    const dados = req.body;
    
    // Forçar tipo_usuario para paciente (não permitir admin/medico)
    const resultado = await usuarioService.criarUsuarioService(dados, false);

    res.status(201).send({
      mensagem: "Usuário criado com sucesso!",
      id: resultado.id
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
});

// Rota administrativa - apenas admins podem cadastrar admin/medico
endpoints.post('/admin/criar/usuario', autenticador, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    if (req.user.role !== 'admin') {
      return res.status(403).send({ erro: 'Acesso negado. Apenas administradores podem criar usuários administrativos.' });
    }

    const dados = req.body;
    const resultado = await usuarioService.criarUsuarioService(dados, true);

    res.status(201).send({
      mensagem: "Usuário criado com sucesso!",
      id: resultado.id
    });
  } catch (err) {
    res.status(400).send({ erro: err.message });
  }
});

endpoints.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await usuarioService.validarLoginService(email, senha);

    res.status(200).send({
      mensagem: "Usuário logado com sucesso!",
      token: generateToken(usuario),
      usuario
    });
  } catch (err) {
    res.status(401).send({ erro: err.message });
  }
});

export default endpoints;