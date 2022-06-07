const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const historico = require("../../models/Historico");



router.get("/historico/:idloja", async (req, res, next) => {
    console.log("Port 3000 - Query: ", req.params.idloja);
    historico.find({ LojaId: req.params.idloja })
    .then(function (lojas) {
      res.send(lojas);
    })
    .catch(next);
    });

    //busca todos os historicos
    router.get("/historico", async (request, res) => {
        try {
          const data = await historico.find();
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ erro: error });
        }
      });

      // get para buscar todos os nivel_risco e timestamp 
      router.get("/historico/risco", async (request, res) => {
        try {
          const data = await historico.find({});
          res.status(200).json(data);
          console.log(data);
        } catch (error) {
          res.status(500).json({ erro: error });
        }
      });
 
    module.exports = router;

