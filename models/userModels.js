const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class userModel extends Model{ }

Model.init(
    {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        sequelize, modelName: "user"
}
)