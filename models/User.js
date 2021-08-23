const {Sequelize,Model, DataTypes} = require('sequelize');
//const sequelize = require('../db.js')
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
},  { sequelize,modelName: "user" });

class Tweet extends Model {}
Tweet.init({
    content: DataTypes.STRING,
    timeCreated: DataTypes.DATE
}, {sequelize, modelName: "tweet"});


User.hasMany(Tweet);
Tweet.belongsTo(User,{foreignKey: "userId"});

(async ()=>{
    await sequelize.sync({force:true})
}) ();


module.exports = {User, Tweet}