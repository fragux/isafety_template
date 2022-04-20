const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const lojaDataCopy = require("../models/Loja");
const bcrypt = require("bcrypt");
const saidaalgoritmo = require("../models/saidaalgoritmo");
const ewadados=require("../models/EWA")

router.use(express.json({ extended: true }));

router.post("/signup", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
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
router.get("/dashboard", async (request, res) => {
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

/*
router.get("/dashboard/:cadeia", async (req, res) => {
  try {
    const loja = await lojaDataCopy.find({ Cadeia: req.query.cadeia });
    if(!loja) {

    res.status(422).json({ message: "Insignia não encontrada!" });
    return;
  }
    res.status(200).json(loja);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});*/
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

router.get("/algoritmo", async (request, res) => {
  try {
    const data = await saidaalgoritmo.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

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
});
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
/// ROUTES EWA/////
router.post("/postewa", async (request, response) => {

  const ewasubmetido = new ewadados({
    RCMat: request.body.RCMat,
    RCProc: request.body.RCProc,
    RCSEC: request.body.RCSEC,
    REFA: request.body.REFA,
    CODUO:request.body.CODUO,
    CODMit:request.body.CODMit,
    CODMat:request.body.CODMat,
    CODSEC:request.body.CODSEC,
    CODINS:request.body.CODINS,
    CDOP:request.body.CDOP,
    CRETECK:request.body.CRETECK,
    CUNID:request.body.CUNID,
    CAREA:request.body.CAREA,
    CSEC:request.body.CSEC,
    CODPROC:request.body.CODPROC,
    CMat:request.body.CMat,
    CMit:request.body.CMit,
    EWA2_AtividadeFisica:request.body.EWA2_AtividadeFisica,
    EWA3_MMC:request.body.EWA3_MMC,
    EWA4_PosturaMovimentos:request.body.EWA4_PosturaMovimentos,
    EWA5_RiscoAcidente:request.body.EWA5_RiscoAcidente,
    EWA6_ConteudoTrabalho:request.body.EWA6_ConteudoTrabalho,
    EWA7_RestritividadeTrabalho:request.body.EWA7_RestritividadeTrabalho,
    EWA8_ComunicacaoTrabalho:request.body.EWA8_ComunicacaoTrabalho,
    EWA9_TomadaDecisao:request.body.EWA9_TomadaDecisao,
    EWA10_Repetitividade:request.body.EWA10_Repetitividade,
    EWA11_NivelAtencao:request.body.EWA11_NivelAtencao,
    EWA12_Iluminacao:request.body.EWA12_Iluminacao,
    EWA13_AmbienteTermico:request.body.EWA13_AmbienteTermico,
    EWA14_Ruido:request.body.EWA14_Ruido,
    EWA1_LocalTrabalho2:request.body.EWA1_LocalTrabalho2,
    EWA2_AtividadeFisica2:request.body.EWA2_AtividadeFisica2,
    EWA3_MMC2:request.body.EWA3_MMC2,
    EWA4_PosturaMovimentos2:request.body.EWA4_PosturaMovimentos2,
    EWA5_RiscoAcidente2:request.body.EWA5_RiscoAcidente2,
    EWA6_ConteudoTrabalho2:request.body.EWA6_ConteudoTrabalho2,
    EWA7_RestritividadeTrabalho2:request.body.EWA7_RestritividadeTrabalho2,
    EWA8_ComunicacaoTrabalho2:request.body.EWA8_ComunicacaoTrabalho2,
    EWA9_TomadaDecisao2:request.body.EWA9_TomadaDecisao2,
    EWA10_Repetitividade2:request.body.EWA10_Repetitividade2,
    EWA11_NivelAtencao2:request.body.EWA11_NivelAtencao2,
    EWA12_Iluminacao2:request.body.EWA12_Iluminacao2,
    EWA13_AmbienteTermico2:request.body.EWA13_AmbienteTermico2,
    EWA14_Ruido2:request.body.EWA14_Ruido2,
    FinalP1:request.body.FinalP1,
    FinalP2:request.body.FinalP2,
    FinalP3:request.body.FinalP3,
    FinalP4:request.body.FinalP4,
    FinalP5:request.body.FinalP5,
    FinalP6:request.body.FinalP6,
    FinalP7:request.body.FinalP7,
    FinalP8:request.body.FinalP8,
    FinalP9:request.body.FinalP9,
    FinalP0:request.body.FinalP10,
    FinalP11:request.body.FinalP11,
    FinalP12:request.body.FinalP12,
    FinalP13:request.body.FinalP13,
    FinalP14:request.body.FinalP15,
    CriterioEWA_Microtarefa:request.body.CriterioEWA_Microtarefa,
    Y_Microtarefa:request.body.Y_Microtarefa,
    EWA_MicroCriterio:request.body.EWA_MicroCriterio,
    Tempo:request.body.Tempo,
    EWA_Macrotarefa:request.body.EWA_Macrotarefa,
    Y_Macrotarefa:request.body.Y_Macrotarefa,
    Processo_Ti:request.body.Processo_Ti,
    EWA_Processo:request.body.EWA_Processo,
    Y_Processo:request.body.Y_Processo,
    FTE_Seccao:request.body.FTE_Seccao,
    HHT_Seccao:request.body.HHT_Seccao,
    HHHTI_Seccao:request.body.HHHTI_Seccao,
    Y_Seccao:request.body.Y_Seccao,
    FTE_Area:request.body.FTE_Area,
    HHT_Area:request.body.HHT_Area,
    HHTI_Area:request.body.HHTI_Area,
    YRelativo_Area:request.body.YRelativo_Area,
    EWA_Area:request.body.EWA_Area,
    Y_Seccao:request.body.Y_Seccao,
    Y_Area:request.body.Y_Area
  });
  
  ewasubmetido
  .save()
  .then((data) => {
    response.json(data);
  })
  .catch((error) => {
    response.json(error);
  });
});
//retorna todos os dados da tabela EWA
router.get("/ewa", async (request, res) => {
  try {
    const data = await ewadados.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// este delete elimina apenas um ewa
router.delete("/ewa/:id", async (req, res) => {
  const id = req.params._id;

  try {
    const deleteewa = await ewadados.deleteOne({_id: id});

    if (!deleteewa) {
      res.status(422).json({ message: "EWA não encontrada!" });
      return;
    }

    res.status(200).json({ message: "EWA eliminada!" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
