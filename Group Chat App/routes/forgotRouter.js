const express=require('express');
const loginRouter=express.Router();

const forgotController=require('../controllers/forgotController.js')

loginRouter.post('/forgotPassword',forgotController.forgotPassword);

loginRouter.post('/forgotPassword/newPassword',forgotController.resetPassword);


module.exports=loginRouter;