import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");
const token_csrf = sequelize.define("token_csrf", {
	key: DataTypes.STRING,
	token: DataTypes.STRING,
});

export default token_csrf