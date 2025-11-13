import { Router } from "express";

import { getAuthentication } from '../utils/jwt.js';
import { atualizarFuncionarioService, buscarFuncionarioPorCPFService, buscarFuncionarioPorNomeService, criarFuncionarioService, deletarFuncionarioService } from "../services/FuncionarioService.js";
import { ListarFuncionarios } from "../repository/FuncionarioRepository.js";
const autenticador = getAuthentication();

const endpoints = Router();

endpoints.get('/funcionarios', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await ListarFuncionarios(dados);

        res.status(201).send({
            resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

endpoints.get('/filtrar/funcionarios', autenticador, async (req, res) => {
    try {
        let cpf = req.query.cpf;

        let resposta = await buscarFuncionarioPorCPFService(cpf);

        res.send({
            resposta
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

endpoints.get('/filtrarNome/funcionarios', autenticador, async (req, res) => {
    try {
        let nome = req.query.nome;

        let dados = await buscarFuncionarioPorNomeService(nome);

        res.send({
            dados
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

endpoints.post('/funcionarios', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await criarFuncionarioService(dados)

        let id = resposta.insertId;

        res.status(201).send({
            mensagem: "Funcionario criado com sucesso!",
            id: id
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

endpoints.put('/funcionarios/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let dados = req.body;

        let resposta = await atualizarFuncionarioService(dados, id);

        res.status(201).send({
            mensagem: "Usuário alterado com sucesso!"
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

endpoints.delete('/funcionarios/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;

        let resposta = await deletarFuncionarioService(id);

        res.status(201).send({
            mensagem: "Usuario deletado com sucesso!"
        })
    }

    catch (err) {
        res.status(401).send({
            erro: err
        })
    }
})

export default endpoints
