const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const ewadados=require("../../models/EWA");



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
  