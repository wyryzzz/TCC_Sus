import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";
import { AtualizarConsulta, BuscarConsultaPorFuncionario, BuscarConsultaPorPaciente, BuscarConsultaPorUnidade, CriarConsulta, DeletarConsulta, ListarConsultas } from "../repository/ConsultasRepository.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/consultas', autenticador, async (req, res) => {
    try {
        let resposta = await ListarConsultas();

        res.status(200).json(resposta);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.get('/consultas/paciente/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await BuscarConsultaPorPaciente(id);

        res.status(200).json(resposta);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.get('/consultas/funcionario/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await BuscarConsultaPorFuncionario(id);

        res.status(200).json(resposta);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.get('/consultas/unidade', autenticador, async (req, res) => {
    try {
        let unidade = req.query.nome;

        let resposta = await BuscarConsultaPorUnidade(unidade);

        res.status(200).json(resposta);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.post('/consultas', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await CriarConsulta(dados);

        res.status(201).json(resposta);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.put('/consultas/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let dados = req.body;

        let resposta = await AtualizarConsulta(id, dados);
        
        res.status(200).json(resposta);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.delete('/consultas/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let resposta = await DeletarConsulta(id);
        res.status(200).json(resposta);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default endpoints;
