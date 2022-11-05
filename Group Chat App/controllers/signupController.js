const USER=require('../models/user.js');

const bcrypt=require('bcrypt');

const saltrounds=10;

exports.userSignup=async (req,res,next)=>{
   try{
    const requestBody=req.body;
    

    const response=await USER.findAll({where:{userid:requestBody.UserId}});

    if(response.length>0){
      res.status(200).json({message:'User Exist'});
    }
   else{
        
      bcrypt.hash(requestBody.UPassword,saltrounds,async (err,hash)=>{

            let response= await USER.create({
                firstname:requestBody.UFirstName,
                lastname:requestBody.ULastName,
                userid:requestBody.UserId,
                useremail:requestBody.UEmail,
                userpassword:hash
             })
            if(response){
               res.status(200).json({message:'You are Signed-Up successfully'});
            }
    })
   }
   
    
}
   catch(err){
    console.log(err);
   }

}
