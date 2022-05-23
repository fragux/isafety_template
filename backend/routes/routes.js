const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const areas = require("../models/Area");


router.use(express.json({ extended: true }));



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


module.exports = router;
