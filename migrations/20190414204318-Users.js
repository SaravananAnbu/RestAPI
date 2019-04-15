'use strict';

const table = "Users";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: { type: Sequelize.UUID, primaryKey: true, unique: true },
      type: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      info: { type: Sequelize.JSON },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table)
  }
};
