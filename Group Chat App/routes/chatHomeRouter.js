const express=require('express');
const chatHomeRouter=express.Router();

//const middleware=require('../controllers/chatHomeController')

const chatHomeController=require('../controllers/chatHomeController.js')

const Authentication=require('../Authentication/Authentication.js')

//chatHomeRouter.post('/userGroupName',chatHomeController.userGroupName);

chatHomeRouter.get('/usersLoggedin',Authentication.Authenticate,chatHomeController.chatHome);

chatHomeRouter.post('/chatAppHome/groupChatMessages',Authentication.Authenticate,chatHomeController.userChatMessage);

chatHomeRouter.post('/chatAppHome/usersMessages',chatHomeController.allUsersMessages);

chatHomeRouter.post('/displayListOfUsers',Authentication.Authenticate,chatHomeController.usersListGroups);





module.exports=chatHomeRouter;