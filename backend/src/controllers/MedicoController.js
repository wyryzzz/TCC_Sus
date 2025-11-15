import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";
import { criarMedicoService, listarMedicosService,   buscarMedicoPorIdService,   buscarMedicoPorNomeService,   atualizarMedicoService,   deletarMedicoService, buscarMedicoPorEmailService
} from "../services/MedicoService.js";

const autenticador = getAuthentication();
const endpoints = Router();

endpoints.get("/medicos", autenticador, async (req, res) => {
    try {
        let resposta = await listarMedicosService();
        res.status(200).json(resposta);
    }

    catch (err) {
        console.error("Erro ao listar médicos:", err);
        res.status(500).json({ erro: err.message || "Erro ao buscar médicos." });
    }
});

endpoints.get("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let resposta = await buscarMedicoPorIdService(id);
        res.status(200).json(resposta);
    } 
    
    catch (err) {
        console.error("Erro ao buscar médico por ID:", err);
        res.status(404).json({ erro: err.message || "Médico não encontrado." });
    }
});

endpoints.get("/filtrar/medicos", autenticador, async (req, res) => {
    try {
        let nome = req.query.nome;
        
        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatório para a busca." });
        }
        
        let resposta = await buscarMedicoPorNomeService(nome);
        res.status(200).json(resposta);
    } 
    
    catch (err) {
        console.error("Erro ao buscar médico por nome:", err);
        res.status(400).json({ erro: err.message || "Erro ao buscar médico." });
    }
});

endpoints.post("/medicos", autenticador, async (req, res) => {
    try {
        let dados = req.body;
        let resposta = await criarMedicoService(dados);
        res.status(201).json({
            mensagem: "Médico cadastrado com sucesso!",
            id: resposta.insertId
        });
    } 
    
    catch (err) {
        console.error("Erro ao criar médico:", err);
        res.status(400).json({ erro: err.message || "Erro ao cadastrar médico." });
    }
});

endpoints.put("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let dados = req.body;
        await atualizarMedicoService(dados, id);
        res.status(200).json({ mensagem: "Médico atualizado com sucesso!" });
    } 
    
    catch (err) {
        console.error("Erro ao atualizar médico:", err);
        res.status(400).json({ erro: err.message || "Erro ao atualizar médico." });
    }
});

endpoints.delete("/medicos/:id", autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        await deletarMedicoService(id);
        res.status(200).json({ mensagem: "Médico removido com sucesso!" });
    }

    catch (err) {
        console.error("Erro ao deletar médico:", err);
        res.status(400).json({ erro: err.message || "Erro ao remover médico." });
    }
});

endpoints.get("/medicos/email/:email", autenticador, async (req, res) => {
    try {
        let email = req.params.email;
        let resposta = await buscarMedicoPorEmailService(email);
        if (resposta) {
            res.status(200).json(resposta);
        } else {
            res.status(404).json({ erro: "Médico não encontrado." });
        }
    }

    catch (err) {
        console.error("Erro ao buscar médico por email:", err);
        res.status(500).json({ erro: err.message || "Erro ao buscar médico." });
    }
});

export default endpoints;
