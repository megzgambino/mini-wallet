'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.STRING
      },
      owned_by: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      enabled_at: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER
      },
      deposited_by: {
        type: Sequelize.STRING
      },
      deposited_at: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      reference_id: {
        type: Sequelize.STRING
      },
      withdrawn_by: {
        type: Sequelize.STRING
      },
      withdrawn_at: {
        type: Sequelize.STRING
      },
      disabled_at: {
        type: Sequelize.STRING
      },
      customer_xid: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallets');
  }
};