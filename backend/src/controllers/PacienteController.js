import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';
import * as pacienteService from '../services/PacienteService.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/pacientes', autenticador, async (req, resp) => {
  try {
    let id = await pacienteService.inserirPaciente(req.body);

    resp.status(201).send({ mensagem: 'Paciente cadastrado com sucesso!', id });

  } 
  
  catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.get('/pacientes', autenticador, async (req, resp) => {
  try {
    let pacientes = await pacienteService.listarPacientes();

    resp.send(pacientes);
  } 
  
  catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

endpoints.get('/pacientes/nome', autenticador, async (req, resp) => {
  try {
    let nome  = req.query.nome;

    if (!nome) return resp.status(400).send({ erro: 'Informe o nome do paciente.' });

    let pacientes = await pacienteService.buscarPacientePorNome(nome);

    resp.send(pacientes);
  } 

  catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.get('/pacientes/cpf', autenticador, async (req, resp) => {
  try {
    let cpf = req.query.cpf;

    if (!cpf) return resp.status(400).send({ erro: 'Informe o CPF do paciente.' });

    let paciente = await pacienteService.buscarPacientePorCpf(cpf);

    resp.send(paciente);
  }

  catch (err) {
    resp.status(404).send({ erro: err.message });
  }
});

endpoints.get('/pacientes/email', autenticador, async (req, resp) => {
  try {
    let email = req.query.email;

    if (!email) return resp.status(400).send({ erro: 'Informe o email do paciente.' });

    let paciente = await pacienteService.buscarPacientePorEmail(email);

    resp.send(paciente);
  }

  catch (err) {
    resp.status(404).send({ erro: err.message });
  }
});


endpoints.put('/pacientes/:id', autenticador, async (req, resp) => {
  try {
    await pacienteService.atualizarPaciente(req.params.id, req.body);

    resp.send({ mensagem: 'Paciente atualizado com sucesso.' });
  } 
  
  catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.delete('/pacientes/:id', autenticador, async (req, resp) => {
  try {
    await pacienteService.deletarPaciente(req.params.id);

    resp.send({ mensagem: 'Paciente removido com sucesso.' });
  } 
  
  catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoints;
