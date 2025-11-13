import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';
import { listarPrescricoesPorPaciente, criarPrescricao } from '../repository/PrescricoesRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/pacientes/:id/prescricoes', autenticador, async (req, res) => {
  try {
    let id = req.params.id;

    let lista = await listarPrescricoesPorPaciente(id);

    res.status(200).json(lista);
  } 
  
  catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

endpoints.post('/pacientes/:id/prescricoes', autenticador, async (req, res) => {
  try {
    let id = req.params.id;
    let corpo = req.body || {};

    let novoId = await criarPrescricao({ ...corpo, paciente_id: Number(id) });

    res.status(201).json({ id: novoId });
  } 
  
  catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

export default endpoints;




