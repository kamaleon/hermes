module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Kamaleon',
          email: 'erp@kamaleon.com.br',
          password_hash:
            '$2a$08$7mOP0n04UoTcP4IGlUkylepZrl2TkH4JXOmHHe4JU/M5lE1KDgm/m',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
