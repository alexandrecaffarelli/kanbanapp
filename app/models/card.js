const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const validator = require('validator');

class Card extends Model {};

Card.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: "Content cannot be null"
    },
    validate: {
      notEmpty: {
        args: true,
        msg: "Content cannot be empty"
      },
    }
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: "Color cannot be null"
    },
    validate: {
      isHexadecimal(value) {
        if (!validator.isHexadecimal(value)) {
          throw new Error('Only hexadecimal values are allowed!')
        };
      },
      notEmpty: {
        args: true,
        msg: "Color cannot be empty"
      },
    }
  }, 
  position: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        args: true,
        msg: "Position must be an integer"
      },
      notEmpty: {
        args: true,
        msg: "Position cannot be empty"
      },
    }
  },
  list_id: {
    type: DataTypes.INTEGER,
    allowNull: {
      args: false,
      msg: "List id cannot be null"
    },
    validate: {
      isInt: {
        args: true,
        msg: "List id must be an integer"
      },
      notEmpty: {
        args: true,
        msg: "List id cannot be empty"
      },
    }
  },
}, {
  sequelize,
  tableName: "card"
});

module.exports = Card;