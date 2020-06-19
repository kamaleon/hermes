module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('profiles', 'password_hash');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
