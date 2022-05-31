// server/routes/route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.use(express.json({ extended: true }));

 

 
//router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
//router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
//router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
//router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 /*

router.post('/signup', userController.signup);
 
router.post('/login', userController.login);*/
module.exports = router;
