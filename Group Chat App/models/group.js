const Sequelize=require('sequelize');

const sequelize=require('../util/dataBase.js');

const GROUPS=sequelize.define('groups',{
   

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
})

module.exports=GROUPS;