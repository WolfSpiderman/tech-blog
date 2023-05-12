const { Model, DataTypes } = require('sequelize');
const uuid = require('uuid4');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuid.v4(),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            },
        },
        contents: {
            type: DataTypes.STRING(2500),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
