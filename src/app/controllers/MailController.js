import * as Yup from 'yup';
import fs from 'fs';

import Mail from '../../lib/Mail';

import Profile from '../models/Profile';

class MailController {
  async store(req, res) {
    const schema = Yup.object().shape({
      profile: Yup.string().email().required(),
      password: Yup.string().required(),
      to: Yup.string().email().required(),
      subject: Yup.string().required(),
      message: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { profile, password } = req.body;

    const profileExists = await Profile.findOne({
      where: { user_id: req.userId, email: profile },
    });

    if (!profileExists) {
      return res.status(401).json({ error: 'Unknown profile.' });
    }

    if (!(await profileExists.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'Profile password does not match.' });
    }

    const { to, subject, message } = req.body;

    const attachments =
      req.files &&
      req.files.map((file) => ({
        filename: file.originalname,
        path: file.path,
      }));

    const result = await Mail.sendMail(
      {
        host: profileExists.smtp_server,
        port: profileExists.smtp_port,
        secure: true,
        auth: {
          user: profileExists.email,
          pass: password,
        },
      },
      {
        to,
        subject,
        text: message,
        attachments,
      }
    );

    if (attachments) {
      attachments.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) throw err;
        });
      });
    }

    return res.json(result);
  }
}

export default new MailController();
