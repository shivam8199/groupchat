const Sequelize=require('sequelize');
const sequelize=require('../util/dataBase.js');

const USERMESSAGES=sequelize.define('usermessages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    umessage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports=USERMESSAGES;