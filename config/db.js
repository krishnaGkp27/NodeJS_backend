const { create } = require("domain");
const { Sequelize } = require("sequelize");

const createDB = new Sequelize("test", "User", "Pass", {
    dialect: "sqlite",
    host: "./config/db.sqlite"
});

module.exports = createDB;