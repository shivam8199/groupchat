const jswt=require('jsonwebtoken');
const USER=require('../models/user.js');

const TOKEN='d4b0f29b1877137109172a1ed62067fa9351a507f7e8e6ffbdde9252df37870137891da68fc8a215f95a91cda7bcd0d342b190487d51457073bb514ede01861b';

exports.Authenticate=async (req,res,next)=>{
    const token=req.header('Authorization');

    const user=Number(jswt.verify(token,TOKEN));
    const userResponse=await USER.findByPk(user);
    console.log(userResponse);
    req.userResponse=user;
    next();

}




