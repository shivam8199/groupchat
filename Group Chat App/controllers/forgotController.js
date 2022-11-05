const USER=require('../models/user.js');

const nodemailer=require('nodemailer');

const UUID=require('uuid');

const bcrypt=require('bcrypt');

const FORGOT=require('../models/forgot.js');

exports.forgotPassword=async (req,res,next)=>{
try{
    const requestBody=req.body.email;
    let response=await USER.findAll({where:{useremail:requestBody}});

    if(response.length!=0){

    console.log(response);
    const id=UUID.v4();
    
    let newResponse=await FORGOT.create({
 
 
       id:id,
       active:true,
       userid:requestBody,
 
    })
    res.status(200).json({message:'Reset Password Link has been sent to your e-mail !!'});
 
    var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
       user: 'pubgmobilechina12@gmail.com',
       pass: 'anrrxmcsjzasgotz'
       }
    });
 
    var mailOptions = {
       from: 'pubgmobilechina12@gmail.com',
       to: requestBody,
       subject: 'Sending Email using Node.js',
       html:`<a href="http://127.0.0.1:5501/ResetPassword/reset.html?${id}">Reset Password</a>`
    };
 
    transporter.sendMail(mailOptions, function(error, info){
       if (error) {
       console.log(error);
       } else {
       res.status(200)
       }
    });

    }


else{
    res.status(200).json({message:'User not found. Please do Register !!'});
}

}

catch(err){
        console.log(err);
}
    
}
 
 
 
exports.resetPassword=async (req,res,next)=>{
    const requestBody=req.body;

    let response=await FORGOT.findByPk(requestBody.userresetId);

    if(response){
        bcrypt.hash(requestBody.npassword,10, async (err,hash)=>{
           
           userPasswordUpdate=response.userid;
  
           let  userPasswordResponse=await USER.update({userpassword:hash},{where:{useremail:userPasswordUpdate}});
        
           res.status(200).json({success:true,message:'Password has been Updated Successfully'})

        })
  
     
  
     }
}