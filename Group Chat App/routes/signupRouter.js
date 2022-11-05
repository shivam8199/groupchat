const express=require('express');
const signupRouter=express.Router();

const signupController=require('../controllers/signupController.js')

signupRouter.post('/userSignUp',signupController.userSignup);


module.exports=signupRouter;