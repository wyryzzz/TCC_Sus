import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';
import * as ubsService from '../services/UnidadeSaudeService.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/ubs', autenticador, async (req, resp) => {
  try {
    let { nome, endereco } = req.body;
    let id = await ubsService.inserirUbs(nome, endereco);
    resp.status(201).send({ mensagem: 'Unidade criada com sucesso!', id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.get('/ubs', autenticador, async (req, resp) => {
  try {
    let lista = await ubsService.listarUbs();
    resp.send(lista);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.get('/ubs/nome', autenticador, async (req, resp) => {
  try {
    let { nome } = req.query;
    if (!nome) return resp.status(400).send({ erro: 'Informe o nome da unidade.' });

    let lista = await ubsService.buscarUbsPorNome(nome);
    resp.send(lista);
  } catch (err) {
    resp.status(404).send({ erro: err.message });
  }
});


endpoints.put('/ubs/:id', autenticador, async (req, resp) => {
  try {
    let { nome, endereco } = req.body;
    await ubsService.atualizarUbs(req.params.id, nome, endereco);
    resp.send({ mensagem: 'Unidade atualizada com sucesso.' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoints.delete('/ubs/:id', autenticador, async (req, resp) => {
  try {
    await ubsService.deletarUbs(req.params.id);
    resp.send({ mensagem: 'Unidade removida com sucesso.' });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoints;
