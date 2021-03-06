const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const lojaDataCopy = require("../../models/Loja");
const areas = require("../../models/Area");

/////Rota para as seccoes////

router.get("/areas/:areas", async (req, res) => {
  const seccao = req.params.Seccao;

  try {
    const getloja = await areas.findOne({ Seccao: Seccao });

    if (!getloja) {
      res.status(422).json({ message: "Loja não encontrada!" });
      return;
    }

    res.status(200).json(getloja);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});



//rotas para as lojas
router.post("/sumeteloja", async (request, response) => {
  console.log("Nome da loja: ", request.body.name);
  console.log("Localização da loja: ", request.body.local);
  console.log("Dados para o algoritmo", request.body.dataAlgoritmo);
  const lojaSubmetida = new lojaDataCopy({
    DT: request.body.DT,
    DTCC: request.body.DTCC,
    DTCCFR: request.body.DTCCFR,
    Distrito: request.body.Distrito,
    Concelho: request.body.Concelho,
    Freguesia: request.body.Freguesia,
    Morada: request.body.Morada,
    CodigoPost: request.body.CodigoPost,
    Localidade: request.body.Localidade,
    Cadeia: request.body.Cadeia,
    Insignia: request.body.Insignia,
    DOP: request.body.DOP,
    Nome: request.body.Nome,
    CodigoLoja: request.body.CodigoLoja,
    AreaVenda: request.body.AreaVenda,
    AnoAbertur: request.body.AnoAbertur,
    Lat: request.body.Lat,
    Long: request.body.Long,
    Disponivel: request.body.Disponivel,
    Nivel_risco: request.body.Nivel_risco,
    dataAlgoritmo: request.body.dataAlgoritmo,
  });
  lojaSubmetida
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});
//este get retorna todas as lojas
router.get("/dashboard",async (request, res) => {
try {
  const data = await lojaDataCopy.find();
  res.status(200).json(data);
} catch (error) {
  res.status(500).json({ erro: error });
}
});
/*Outra maneira
router.get('/loja',  async (request, response) => {
    const data = await lojaDataCopy.find({})
    return response.json(data);
    })*/

//este get retorna apenas uma loja
router.get("/dashboard/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getloja = await lojaDataCopy.findOne({ _id: id });

    if (!getloja) {
      res.status(422).json({ message: "Loja não encontrada!" });
      return;
    }

    res.status(200).json(getloja);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/*
//get para buscar apenas as lojas com o insignia especifico
router.get("/loja/cadeia/:cadeia", function(req, res) {
  var query = req.params.cadeia;
  console.log("Query activated!!!!")
  lojaDataCopy.find({
      'request': query
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})*/

router.get("/dashboard/cadeia/:cadeia", function (req, res, next) {
  console.log("Port 3000 - Query: ", req.params.cadeia);
  lojaDataCopy
    .find({ Cadeia: req.params.cadeia })
    .then(function (lojas) {
      res.send(lojas);
    })
    .catch(next);
});

router.get("/dashboard/continente/:dop", function (req, res, next) {
  console.log("Port 3000 - Query Continente DOP: ", req.params.dop);
  lojaDataCopy
    .find({DOP: new RegExp(req.params.dop.substring(0,3) +" "+  req.params.dop.substring(3,req.params.dop.length), "i") })
    .then(function (lojas) {
      res.send(lojas);
    })
    .catch(next);
});

router.get("/dashboard/modelo/:dop", function (req, res, next) {
  console.log("Port 3000 - Query Modelo DOP: ", req.params.dop);
  lojaDataCopy
    .find({DOP: new RegExp(req.params.dop.substring(0,2) + req.params.dop.substring(2,req.params.dop.length), "i") })
    .then(function (lojas) {
      res.send(lojas);
    })
    .catch(next);
});

router.get("/dashboard/bomdia/:dop", function (req, res, next) {
  console.log("Port 3000 - Query Bom Dia DOP: ", req.params.dop);
  lojaDataCopy
    .find({DOP: new RegExp(req.params.dop.substring(0,3) + req.params.dop.substring(3,req.params.dop.length), "i") })
    .then(function (lojas) {
      res.send(lojas);
    })
    .catch(next);
});

/*
router.route('/loja/:id')
    .get((req, res) => {
        lojaDataCopy.findById(req.params.id, (err, loja) => {
            res.json(loja)
        })  
    })*/

//este patch atualiza apenas uma loja
router.patch("/loja/:id", async (req, res) => {
  const id = req.params.id;
  const {
    DT,
    DTCC,
    DTCCFR,
    Distrito,
    Concelho,
    Freguesia,
    Morada,
    CodigoPost,
    Localidade,
    Cadeia,
    Insignia,
    DOP,
    Nome,
    CodigoLoja,
    AreaVenda,
    AnoAbertur,
    Lat,
    Long,
    Disponivel,
    Nivel_risco,
    dataAlgoritmo,
  } = req.body;
  const loja = {
    DT,
    DTCC,
    DTCCFR,
    Distrito,
    Concelho,
    Freguesia,
    Morada,
    CodigoPost,
    Localidade,
    Cadeia,
    Insignia,
    DOP,
    Nome,
    CodigoLoja,
    AreaVenda,
    AnoAbertur,
    Lat,
    Long,
    Disponivel,
    Nivel_risco,
    dataAlgoritmo,
  };
  try {
    const updatedLoja = await lojaDataCopy.updateOne({ _id: id }, loja);
    if (updatedLoja.matchedCount === 0) {
      res.status(422).json({ message: "Loja não encontrada!" });
      return;
    }
    res.status(200).json(loja);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// este delete elimina apenas uma loja
router.delete("/loja/:id", async (req, res) => {
  const id = req.params._id;

  try {
    const deleteloja = await lojaDataCopy.deleteOne({
      "req.params.lojaDataCopy_id": id,
    });

    if (!deleteloja) {
      res.status(422).json({ message: "Loja não encontrada!" });
      return;
    }

    res.status(200).json(deleteloja);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});


module.exports = router;
