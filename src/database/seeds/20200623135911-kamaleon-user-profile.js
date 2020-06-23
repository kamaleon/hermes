module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'erp@kamaleon.com.br';"
    );

    const usrRow = user[0];

    return queryInterface.bulkInsert(
      'profiles',
      [
        {
          email: 'erp@kamaleon.com.br',
          smtp_server: 'smtp.gmail.com',
          smtp_port: '465',
          user_id: usrRow[0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const user = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'erp@kamaleon.com.br';"
    );

    const usrRow = user[0];

    return queryInterface.bulkDelete('profiles', { user_id: usrRow[0].id }, {});
  },
};
