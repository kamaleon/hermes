import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        smtp_server: Sequelize.STRING,
        smtp_port: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (profile) => {
      if (profile.password) {
        profile.password_hash = await bcrypt.hash(profile.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Profile;
