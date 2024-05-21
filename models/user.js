const Sequelize = require('sequelize');

const user_Db = require('../util/database');

const BookingUser = user_Db.define('users',{
    id: 
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    contact: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = BookingUser;