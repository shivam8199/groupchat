const Sequelize=require('sequelize');

const sequelize=require('../util/dataBase.js');

const USERGROUPS=sequelize.define('USERGROUPS',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    admin:{
        type:Sequelize.BOOLEAN,
        byDefalut:false
    }
})

module.exports=USERGROUPS;