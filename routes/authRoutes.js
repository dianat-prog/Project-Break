const express=require('express');
const router = express.Router();
const path =require('path');
const authController = require('../controllers/authController')


 
router.get('/register',authController.showRegister);  
router.post('/register',authController.verifyUser)


router.get('/login',authController.showLogin)
router.post('/login', authController.verifyToken);


router.get('/logout',authController.logout)



       
module.exports =router;