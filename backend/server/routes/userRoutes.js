/*const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../../models/SignUpModels");
const bcrypt = require("bcrypt");

//ou get
router.post("/signup12", async (request, response) => {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password, saltPassword);
  
    const signedUpUser = new signUpTemplateCopy({
     
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


  router.post("/login", function (request, response) {
    login.loginUser(req, res, function(err, data) {
      if (err) {
        res.json({ 'error': true, 'message': 'Error logged in' });
      } else {
        res.json({ 'success': true, 'data': data });
      }
    });
  });
  
  module.exports = router;*/
