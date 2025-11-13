import { Router } from "express";
import { getAuthentication } from "../utils/jwt.js";
import { serviceListarMedicamentos, serviceListarMedicamentosNome, serviceInserirMedicamentos, serviceAtualizarMedicamentos, serviceDeletarMedicamentos } from "../services/MedicamentosService.js";

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.get('/medicamentos', autenticador, async (req, res) => {
    try {
        let resposta = await serviceListarMedicamentos();

        res.status(200).json(resposta);
    } 
    
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.get('/medicamentos/filtrar', autenticador, async (req, res) => {
    try {
        let nome = req.query.nome;

        let resposta = await serviceListarMedicamentosNome(nome);

        res.status(200).json(resposta);
    } 
    
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.post('/medicamentos', autenticador, async (req, res) => {
    try {
        let dados = req.body;

        let resposta = await serviceInserirMedicamentos(dados);

        res.status(201).json({ resposta });
    } 
    
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

endpoints.put('/medicamentos/:id', autenticador, async (req, res) => {
  try {
    let id = req.params.id;
    let dados = req.body;

    console.log("Atualizando medicamento ID:", id);
    console.log("Dados recebidos:", dados);

    let resposta = await serviceAtualizarMedicamentos(id, dados);
    res.status(200).json(resposta);
  } 
  
  catch (error) {
    console.error("Erro ao atualizar medicamento:", error);
    res.status(500).json({ erro: error.message });
  }
});

endpoints.delete('/medicamentos/:id', autenticador, async (req, res) => {
    try {
        let id = req.params.id;
        let resposta = await serviceDeletarMedicamentos(id);

        res.status(200).json(resposta);
    } 
    
    
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default endpoints;
