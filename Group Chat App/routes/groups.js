const express=require('express');
const groupRouter=express.Router();
const Authentication=require('../Authentication/Authentication.js')

const groupsController=require('../controllers/Groups.js')

groupRouter.post('/creatingGroup',groupsController.createGroup)

groupRouter.post('/postcreatingGroup',Authentication.Authenticate,groupsController.postCreatingGroup)

groupRouter.post('/deleteGroup',Authentication.Authenticate,groupsController.deleteGroup)

groupRouter.post('/addUser',Authentication.Authenticate,groupsController.addMember);

groupRouter.post('/deleteMember',Authentication.Authenticate,groupsController.deleteMember);

groupRouter.post('/makeUserAdmin',Authentication.Authenticate,groupsController.makeUserAdmin);

groupRouter.get('/usersGroups',Authentication.Authenticate,groupsController.usersGroups);

//groupRouter.post('/userGroupName',groupsController.userGroupName);



module.exports=groupRouter;