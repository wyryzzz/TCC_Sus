import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";
import { criarMedicoService, listarMedicosService,   buscarMedicoPorIdService,   buscarMedicoPorNomeService,   atualizarMedicoService,   deletarMedicoService, buscarMedicoPorEmailService
} from "../services/MedicoService.js";

const autenticador = getAuthentication();
const endpoints = Router();

endpoints.get("/medicos", autenticador, async (req, res) => {
    try {
        let resposta = await listarMedicosService();
        res.status(200).send(resposta);
    }

    catch (err) {
        res.status(500).send({ erro: err });
    }
});

endpoints.get("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let resposta = await buscarMedicoPorIdService(id);
        res.status(200).send(resposta);
    } 
    
    catch (err) {
        res.status(404).send({ erro: err });
    }
});

endpoints.get("/filtrar/medicos", autenticador, async (req, res) => {
    try {
        let nome = req.query.nome;
        let resposta = await buscarMedicoPorNomeService(nome);
        res.status(200).send(resposta);
    } 
    
    catch (err) {
        res.status(400).send({ erro: err });
    }
});

endpoints.post("/medicos", autenticador, async (req, res) => {
    try {
        let dados = req.body;
        let resposta = await criarMedicoService(dados);
        res.status(201).send({
            mensagem: "Médico cadastrado com sucesso!",
            id: resposta.insertId
        });
    } 
    
    catch (err) {
        res.status(400).send({ erro: err });
    }
});

endpoints.put("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let dados = req.body;
        await atualizarMedicoService(dados, id);
        res.status(200).send({ mensagem: "Médico atualizado com sucesso!" });
    } 
    
    catch (err) {
        res.status(400).send({ erro: err });
    }
});

endpoints.delete("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        await deletarMedicoService(id);
        res.status(200).send({ mensagem: "Médico removido com sucesso!" });
    }

    catch (err) {
        res.status(400).send({ erro: err });
    }
});

endpoints.get("/medicos/email/:email", autenticador, async (req, res) => {
    try {
        let email = req.params.email;
        let resposta = await buscarMedicoPorEmailService(email);
        if (resposta) {
            res.status(200).send(resposta);
        } else {
            res.status(404).send({ erro: "Médico não encontrado." });
        }
    }

    catch (err) {
        res.status(500).send({ erro: err });
    }
});

export default endpoints;
