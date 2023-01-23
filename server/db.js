const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    'project',
    'root',
    '',
    {
        dialect: "mysql",
        host: "127.0.0.1",
        port: 3306
    }
);