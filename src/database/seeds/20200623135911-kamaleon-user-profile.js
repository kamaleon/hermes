module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user_id = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'erp@kamaleon.com.br';"
    );

    return queryInterface.bulkInsert(
      'profiles',
      [
        {
          email: 'erp@kamaleon.com.br',
          smtp_server: 'smtp.gmail.com',
          smtp_port: '465',
          user_id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const user_id = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'erp@kamaleon.com.br';"
    );

    return queryInterface.bulkDelete('profiles', { user_id }, {});
  },
};
