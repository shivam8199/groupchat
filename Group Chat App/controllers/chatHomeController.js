const GROUPS=require('../models/group.js');

const USER=require('../models/user.js');

const USERGROUPS=require('../models/usergroups.js');

const USERMESSAGES = require('../models/userMessages.js');



// exports.userGroupName=async (req,res,next)=>{
//     try{
//         const requestBody=req.body;
//         let findingGroupId=await GROUPS.findOne({where:{groupname:requestBody.usergroupname}})
//         console.log(findingGroupId.id);
//         console.log('hello world');
       
//         res.status(200).json({res:findingGroupId.groupname});
//         next();
//     }
//     catch(err){
//       console.log(err);
//     }
// }

exports.chatHome=async (req,res,next)=>{
    try{
   let response=await USER.findByPk(req.userResponse);
  
    
    res.status(200).json({res:response});
    }
    catch(err){
      console.log(err);
    }
 
}

exports.userChatMessage=async (req,res,next)=>{
  try{
      const requestBody=req.body;
      let findingGroupId=await GROUPS.findOne({where:{groupname:requestBody.groupName}})

      const response=await USERMESSAGES.create({
        umessage:requestBody.umessage,
        name:requestBody.userName,
        groupId:findingGroupId.id,
        userId:req.userResponse
      })
      console.log(response);
  }
  catch(err){
    console.log(err);
  }

}


exports.allUsersMessages=async (req,res,next)=>{
  try{
    const requestBody=req.body;
    const findingGroupId=await GROUPS.findOne({where:{groupname:requestBody.userGroupName}})
    
    const getAllMessages=await USERMESSAGES.findAll({where:{groupId:findingGroupId.id}});
    res.status(200).json({res:getAllMessages});
    }
    catch(err){
      console.log(err);
    }

}

exports.usersListGroups=async (req,res,next)=>{
  try{
    //userGroupName
    const requestBody=req.body;
  
    const findingGroupId=await GROUPS.findOne({where:{groupname:requestBody.userGroupName}})
    console.log(findingGroupId.id)
    const findingUsersList=await USERGROUPS.findAll({where:{groupId:findingGroupId.id}})
     //console.log(findingUsersList)
     const usersList=[]
     const userListId=[]

     for(i=0;i<findingUsersList.length;i++){
      const id=findingUsersList[i].userId

      

      const findingUsers=await USER.findOne({where:{id:id}})
      usersList.push(findingUsers.firstname);
      
      const userAdminResponse=await USERGROUPS.findOne({where:{userId:id,groupId:findingGroupId.id}})
      console.log(userAdminResponse.admin);
      
      if(userAdminResponse.admin===true){

        const findingUserFromUsers=await USER.findOne({where:{id:userAdminResponse.userId}})
    
        userListId.push(findingUserFromUsers.firstname)
      }
     
      
     }
     console.log(userListId)

     
     res.status(200).json({res:usersList,Admin:userListId})
  }
  catch(err){
    console.log(err);
  }

}

