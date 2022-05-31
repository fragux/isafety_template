const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const alert = require("../../models/alertas");


//retorna todos os alertas
router.get("/alertas",async (request, res) => {
try {
  const data = await alert.find();
  res.status(200).json(data);
} catch (error) {
  res.status(500).json({ erro: error });
}
});


//cria um alerta

router.post("/sumetealert", async (request, response) => {
  
    const alertaSubmetido = new alert({
    Titulo:request.body.Titulo,
    Descricao:request.body.Descricao,
    Risco:request.body.Risco,
    Envio: request.body.Envio,
    
    });
    alertaSubmetido
      .save()
      .then((data) => {
        response.json(data);
      })
      .catch((error) => {
        response.json(error);
      });
  });

  //retorna todos os alertas lançados vermelhos
   //retorna todos os alertas lançados amarelo
    //retorna todos os alertas lançados verde
  module.exports = router;