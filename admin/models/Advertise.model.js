const {sequelize} = require('../../index');
const {DataTypes} = require('sequelize');


const Advertise = sequelize.define("advertise",{
    advertisepic:{
        type:DataTypes.STRING,
        allowNull:true
    },
    advertisename:{
        type:DataTypes.STRING,
        allowNull:true
    },
    advertisedesc:{
        type:DataTypes.TEXT,
        allowNull:true
    }
})


module.exports = {Advertise}