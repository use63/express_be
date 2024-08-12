import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "express_be",
});

export default db