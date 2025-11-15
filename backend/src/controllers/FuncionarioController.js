import { Router } from "express";

import { getAuthentication } from '../utils/jwt.js';
import { atualizarFuncionarioService, buscarFuncionarioPorCPFService, buscarFuncionarioPorNomeService, criarFuncionarioService, deletarFuncionarioService } from "../services/FuncionarioService.js";
import { ListarFuncionarios } from "../repository/FuncionarioRepository.js";
const autenticador = getAuthentication();

const endpoints = Router();

endpoints.get('/funcionarios', autenticador, async (req, res) => {
    try {
        let [resposta] = await ListarFuncionarios();

        res.status(200).json(resposta);
    }

    catch (err) {
        console.error("Erro ao listar funcionários:", err);
        res.status(500).json({ erro: err.message || "Erro ao buscar funcionários." });
    }
})

endpoints.get('/filtrar/funcionarios', autenticador, async (req, res) => {
    try {
        let cpf = req.query.cpf;

        if (!cpf) {
            return res.status(400).json({ erro: "CPF é obrigatório para a busca." });
        }

        let resposta = await buscarFuncionarioPorCPFService(cpf);

        res.status(200).json(resposta);
    }

    catch (err) {
        console.error("Erro ao buscar funcionário por CPF:", err);
        res.status(400).json({ erro: err.message || "Erro ao buscar funcionário." });
    }
})

endpoints.get('/filtrarNome/funcionarios', autenticador, async (req, res) => {
    try {
        let nome = req.query.nome;

        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatório para a busca." });
        }

        let dados = await buscarFuncionarioPorNomeService(nome);

        res.status(200).json(dados);
    }

    catch (err) {
        console.error("Erro ao buscar funcionário por nome:", err);
        res.status(400).json({ erro: err.message || "Erro ao buscar funcionário." });
    }
})

endpoints.post('/funcionarios', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await criarFuncionarioService(dados);

        res.status(201).json({
            mensagem: "Funcionário criado com sucesso!",
            id: resposta.id
        });
    }

    catch (err) {
        console.error("Erro ao criar funcionário:", err);
        res.status(400).json({ erro: err.message || "Erro ao criar funcionário." });
    }
})

endpoints.put('/funcionarios/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let dados = req.body;

        await atualizarFuncionarioService(dados, id);

        res.status(200).json({
            mensagem: "Funcionário atualizado com sucesso!"
        });
    }

    catch (err) {
        console.error("Erro ao atualizar funcionário:", err);
        res.status(400).json({ erro: err.message || "Erro ao atualizar funcionário." });
    }
})

endpoints.delete('/funcionarios/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        await deletarFuncionarioService(id);

        res.status(200).json({
            mensagem: "Funcionário removido com sucesso!"
        });
    }

    catch (err) {
        console.error("Erro ao deletar funcionário:", err);
        res.status(400).json({ erro: err.message || "Erro ao remover funcionário." });
    }
})

export default endpoints
