const USER=require('../models/user.js');

const bcrypt=require('bcrypt');

const jswt=require('jsonwebtoken');

const TOKEN='d4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b';


exports.userLogin=async (req,res,next)=>{
    try{
    const requestBody=req.body;

    let loginResponse=await USER.findAll({where:{ useremail:requestBody.UEmail} });
    
    //let loggedinResponse=await USER.findAll({where:{userid:requestBody.UEmail}});
    if(loginResponse.length!=0){
   
       const passwordResponse=await bcrypt.compare(requestBody.UPassword,loginResponse[0].userpassword)
        
        if(passwordResponse){
            
            
            
            const token = jswt.sign(loginResponse[0].id,TOKEN);
        
            res.status(200).json({success:true,res:token,message:'Logged-In Successfully'});  
            }

            else{
                res.status(200).json({success:false,message:'Re-Check All credentials'});
            }
                 
    }
    else {
          
        res.status(200).json({success:false,message:'User Does Not Exist. Please Register !!'})
     }

    }
    catch(err){
    console.log(err);
    }

}
