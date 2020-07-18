const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const validator = require('validator');

class Tag extends Model {};

Tag.init({
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
  color: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: "color cannot be null"
    },
    validate: {
      isHexadecimal(value) {
        if (!validator.isHexadecimal(value)) {
          throw new Error('Only hexadecimal values are allowed!')
        };
      },
      notEmpty: {
        args: true,
        msg: "color cannot be empty"
      },
    }
  }, 
}, {
  sequelize,
  tableName: "tag"
});

module.exports = Tag;