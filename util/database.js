


const Sequelize = require('sequelize');
// require('dotenv').config();

const sequelize = new Sequelize("bookingapp","root","069124",{
    dialect: "mysql",
    host: "localhost"
});

module.exports= sequelize;
