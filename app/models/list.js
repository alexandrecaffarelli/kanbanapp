const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class List extends Model { };

List.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: "name cannot be null"
    },
    validate: {
      notEmpty: {
        args: true,
        msg: "name cannot be empty"
      },
    }
  },
  position: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        args: true,
        msg: "position must be an integer"
      },
      notEmpty: {
        args: true,
        msg: "position cannot be empty"
      },
    }
  },
}, {
  sequelize,
  tableName: "list"
});

module.exports = List;