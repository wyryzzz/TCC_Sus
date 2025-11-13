import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';
import * as estatisticasRepo from '../repository/EstatisticasRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/estatisticas/dashboard', autenticador, async (req, resp) => {
  try {
    let totalPacientes = await estatisticasRepo.contarPacientes();
    let totalFuncionarios = await estatisticasRepo.contarFuncionariosAtivos();
    let consultasHoje = await estatisticasRepo.contarConsultasHoje();
    let totalMedicamentos = await estatisticasRepo.contarMedicamentos();

    resp.json({
      totalPacientes,
      consultasHoje,
      totalMedicamentos,
      funcionariosAtivos: totalFuncionarios
    });
  }

  catch (err) {
    resp.status(500).json({ erro: err.message });
  }
});


endpoints.get('/estatisticas/consultas/por-mes', autenticador, async (req, resp) => {
  try {
    let limite = parseInt(req.query.meses) || 6;

    let resultado = await estatisticasRepo.consultasPorMes(limite);

    resp.json(resultado);
  }

  catch (err) {
    resp.status(500).json({ erro: err.message });
  }
});

endpoints.get('/estatisticas/consultas/por-status', autenticador, async (req, resp) => {
  try {
    let resultado = await estatisticasRepo.consultasPorStatus();

    resp.json(resultado);
  }

  catch (err) {
    resp.status(500).json({ erro: err.message });
  }
});

endpoints.get('/estatisticas/pacientes/por-idade', autenticador, async (req, resp) => {
  try {
    let resultado = await estatisticasRepo.pacientesPorIdade();
    resp.json(resultado);
  }

  catch (err) {
    console.error("Erro ao buscar pacientes por idade:", err);
    resp.status(500).json({ erro: err.message });
  }
});


endpoints.get('/estatisticas/funcionarios/especialidades', autenticador, async (req, resp) => {
  try {
    let resultado = await estatisticasRepo.especialidadesPorFuncionarios();
    resp.json(resultado);
  }

  catch (err) {
    resp.status(500).json({ erro: err.message });
  }
});

endpoints.get('/estatisticas/medicamentos/consumo', autenticador, async (req, resp) => {
  try {
    let resultado = await estatisticasRepo.medicamentosPorConsumo();
    resp.json(resultado);
  }

  catch (err) {
    console.error("Erro ao buscar consumo de medicamentos:", err);
    resp.status(500).json({ erro: err.message });
  }
});


endpoints.get('/estatisticas/funcionarios/por-tipo', autenticador, async (req, resp) => {
  try {
    let resultado = await estatisticasRepo.funcionariosPorTipo();
    resp.json(resultado);
  }

  catch (err) {
    resp.status(500).json({ erro: err.message });
  }
});

export default endpoints;
