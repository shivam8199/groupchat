const GROUPS=require('../models/group.js');

const USER=require('../models/user.js');

const USERGROUPS=require('../models/usergroups.js');

exports.createGroup=async (req,res,next)=>{
    try{
    const requestBody=req.body;
    const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.groupname}});
    if(findingGroupID==null){

   let response=await GROUPS.create({
    groupname:requestBody.groupname
    })
    res.status(200).json({res:response,message:'successfully created'});
     
    }
    else{
        console.log('helo world')
        res.status(200).json({message:'Group Exist '});
    }
}
catch(err){
   console.log(err);
}
} 


exports.postCreatingGroup=async (req,res,next)=>{
    try{
    const requestBody=req.body;
    let response= await USERGROUPS.create({
        userId:req.userResponse,
        groupId:requestBody.groupid
    })
    const defaultAdmin=await USERGROUPS.update({admin:true},{where:{userId:req.userResponse}});
}
    catch(err){
        console.log(err);
     }
}

exports.deleteGroup=async (req,res,next)=>{
    const requestBody=req.body;
    
    const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.groupName}})
    if(findingGroupID){
    
    const findIsAdmin=await USERGROUPS.findOne({where:{userId:req.userResponse,groupId:findingGroupID.id}})
    

    if(findIsAdmin!=null && findIsAdmin.admin===true ){
    
    let response=await GROUPS.destroy({where:{groupname:requestBody.groupName}})
    if(response){
    res.status(200).json({res:'successfully deleted'})
    }
    }
    else{
        res.status(200).json({res:'you are not admin'})
    }
    }
    else{
        res.status(200).json({res:'Group Does not exist'})
    }
  
}


exports.addMember=async (req,res,next)=>{
    const requestBody=req.body;
    const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.groupname}})
    console.log(findingGroupID.id)
    
    const findIsAdmin=await USERGROUPS.findOne({where:{userId:req.userResponse,groupId:findingGroupID.id}})
    console.log(findIsAdmin);

    if(findIsAdmin!=null && findIsAdmin.admin===true){

        
        
        const findingUser=await USER.findOne({where:{useremail:requestBody.addUser}})
        if(findingUser){
        console.log(findingUser.id);

        const findingGroupName=await GROUPS.findOne({where:{groupname:requestBody.groupname}})
        
        if(findingGroupName){
            console.log(findingGroupName.id)
            
            try{
            const userGroupsResponse=await USERGROUPS.create({
                userId:findingUser.id,
                groupId:findingGroupName.id,
                admin:false
            })
            res.status(200).json({res:'successfully Added'})
            }
            catch(err){
                console.log(err);
                res.status(200).json({res:'Already in Group'})
            }
        }
        else{
            res.status(200).json({res:'User Does not Exist'})
        }
        }
        else{
            res.status(200).json({res:'Group Does not Exist'})
        }
    }
    else{
        res.status(200).json({res:'you are not admin'})
    }
    

}

exports.deleteMember=async (req,res,next)=>{
    const requestBody=req.body;
    const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.groupMemberName}})
    console.log(findingGroupID.id)
    
    const findIsAdmin=await USERGROUPS.findOne({where:{userId:req.userResponse,groupId:findingGroupID.id}})
    console.log(findIsAdmin);

    if(findIsAdmin!=null && findIsAdmin.admin===true){
    const requestBody=req.body;

    const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.groupMemberName}});

    const findingUserID=await USER.findOne({where:{useremail:requestBody.groupMemberId}})

    let response=await USERGROUPS.destroy({where:{userId:findingUserID.id,groupId:findingGroupID.id}})
    
    res.status(200).json({res:'successfully deleted'})
    } 
    else{
        res.status(200).json({res:'you are not admin'})
    }
}



exports.makeUserAdmin=async (req,res,next)=>{
    try{
        const requestBody=req.body;
        const findingGroupID=await GROUPS.findOne({where:{groupname:requestBody.adminGroupName}})
        console.log(findingGroupID.id)

        if(findingGroupID){

        const findIsAdmin=await USERGROUPS.findOne({where:{userId:req.userResponse,groupId:findingGroupID.id}})
        console.log(findIsAdmin);
        
        const findingUser=await USER.findOne({where:{useremail:requestBody.adminGroupEmail}})

        if(findingUser){

        if(findIsAdmin!=null && findIsAdmin.admin===true ){
  
        const findingGroupName=await GROUPS.findOne({where:{groupname:requestBody.adminGroupName}})

       

        const response=await USERGROUPS.update({admin:true},{where:{userId:findingUser.id,groupId:findingGroupName.id}});
        res.status(200).json({res:'successfully updated'});
    }
    else{
        res.status(200).json({res:'you are not admin'});
    }
    }
    else{
        res.status(200).json({res:'wrong email id'});
    }
        
    }
    else{
        res.status(200).json({res:'Group Does not exist'})
    }
    }
    catch(err){
      console.log(err);
    }
}


exports.usersGroups=async (req,res,next)=>{
    try{
        

     const response=await USERGROUPS.findAll({where:{userId:req.userResponse}});
     console.log(response.length);
     let userGroupNames=[];
    for(let i=0;i< response.length;i++){
        const groupResponse=await GROUPS.findByPk(response[i].groupId);
            userGroupNames.push(groupResponse.groupname);
      }

      res.status(200).json({res:userGroupNames});
    
    
    }
    catch(err){
      console.log(err);
    }
}


