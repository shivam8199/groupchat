const Sequelize=require('sequelize');
const sequelize=require('../util/dataBase.js');

const FORGOT=sequelize.define('resetpassword',{

    id:{type:Sequelize.UUID,
        primaryKey:true
    },
    active: Sequelize.BOOLEAN,
    userid: Sequelize.STRING
    

})

module.exports=FORGOT;