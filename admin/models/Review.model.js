const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');

const Review = sequelize.define("review",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    profilepic:{
        type:DataTypes.STRING,
        allowNull:true
    },
    profilename:{
        type:DataTypes.STRING,
        allowNull:true
    },
    reviewDesc:{
        type:DataTypes.TEXT,
        allowNull:true
    }
   
})


module.exports = {Review}