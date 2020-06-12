module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('profiles', 'user_id');
  },
};
