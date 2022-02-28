'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallet.init({
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    customer_xid: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUUID: 4
      }
    },
    owned_by: {
      type: DataTypes.STRING,
      validate: {
        isUUID: 4
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }, 
    enabled_at: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    },
    balance: { 
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    deposited_by: {
      type: DataTypes.STRING,
      validate: {
        isUUID: 4
      }
    },
    deposited_at: { 
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    reference_id: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUUID: 4
      }
    },
    withdrawn_by: {
      type: DataTypes.STRING,
      validate: {
        isUUID: 4
      }
    },
    withdrawn_at: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    },
    disabled_at: {
      type: DataTypes.STRING,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};