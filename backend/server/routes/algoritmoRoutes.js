const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const saidaalgoritmo = require("../../models/saidaalgoritmo");
const algoritmoPython = require("../../models/Algoritmo")
/// ROUTES SAIDA ALGORITMO/////
router.post("/submetealgoritmo", async (req, res) => {

    const algoritmoSubmetido = new saidaalgoritmo({
    
      Nivel_risco: req.body.Nivel_risco,
      lojaId: req.body.lojaId,
    });
    
    algoritmoSubmetido
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
      
  });
  
  
  
  router.get("/algoritmo/:idloja", async (req, res) => {
    try {
      const data = await saidaalgoritmo.findOne({ LojaId: req.params.idloja});
      if(!data) {
  
        res.status(422).json({ message: "Insignia não encontrada!" });
        return;
      }
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ message: err });
      }
    });
  
  
  
  
  //teste
  router.get("/algoritmo/saida/:idloja", function (req, res, next) {
    console.log("Port 3000 - Query: ", req.params.idloja);
    saidaalgoritmo
      .find({ LojaId: req.params.idloja })
      .then(function (lojas) {
        res.send(lojas);
      })
      .catch(next);
  });
  
  //endpoint para algoritmo do python
  router.get("/python", async (request, res) => {
    try {
      console.log("Algoritmo /python");
      const dataAlgoritmo = await algoritmoPython.find();
        res.status(200).json(dataAlgoritmo);
      } catch (error) {
        res.status(500).json({ erro: error });
      }
    });
  
  router.get("/python/:idloja", async (req, res) => {
    try {
      console.log("Algoritmo /python/:idloja=" + req.params.idloja);
      const dataAlgoritmo = await algoritmoPython.findOne({ _id: req.params.idloja});
      if(!dataAlgoritmo) {
        res.status(422).json({ message: "Algoritmo não encontrado!" });
        return;
      }
      res.status(200).json(dataAlgoritmo);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
  
  
  
  router.get("/algoritmo/saida/:idloja/saidaalgoritmo", function (req, res, next) {
    console.log("Port 3000 - Query: ", req.body.saidaalgoritmo.id);
    saidaalgoritmo
      .find({LojaId: req.params.idloja, saidaalgoritmo: req.body.saidaalgoritmo})
      .then(function (lojas) {
       
        res.send(lojas);
      })
    .catch(next);
  });
  /*router.get("/dashboard/:Cadeia", async (req, res) => {
    const Cadeia = req.query.Cadeia;
  
    try {
      const getInsignia = await lojaDataCopy.find({ Cadeia }, "");
  
      if (!getInsignia) {
        res.status(422).json({ message: "Insignia não encontrada!" });
        return;
      }
  
      res.status(200).json(getInsignia);
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });*/
  
  
  router.delete("/algoritmo/:id", async (req, res) => {
    const id = req.params._id;
  
    try {
      const deletealgoritmo = await saidaalgoritmo.findByIdAndDelete({ _id: id});
  
      if (!deletealgoritmo) {
        res.status(422).json({ message: "saida do algoritmo não encontrada!" });
        return;
      }
  
      res.status(200).json(deletealgoritmo);
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });
  /*
  router.get("/algoritmo/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const getalgoritmo = await saidaalgoritmo.findOne({ _id: id });
  
      if (!getalgoritmo) {
        res.status(422).json({ message: "saida do algoritmo não encontrada!" });
        return;
      }
  
      res.status(200).json(getalgoritmo);
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });*/
  //este patch atualiza apenas uma loja
  router.patch("/algoritmo/:id", async (req, res) => {
    const id = req.params.id;
    const {
      Nivel_risco,
    
      
    } = req.body;
    const algoritmo = {
      Nivel_risco,
    
    };
    try {
      const updatedalgoritmo = await saidaalgoritmo.updateOne({ _id: id }, algoritmo);
      if (updatedalgoritmo.matchedCount === 0) {
        res.status(422).json({ message: "Saida de algoritmo não encontrada!" });
        return;
      }
      res.status(200).json(algoritmo);
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });

  module.exports = router;
