const Sequelize=require('sequelize');

const sequelize=require('../util/dataBase.js');

const USER=sequelize.define('users',{
 
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    firstname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userid:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    useremail:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    userpassword:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports=USER;
