import { db } from "../utils/index.js";
import { DataTypes } from "sequelize";

// model one time token

const Ott = db.define("otts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Ott;
