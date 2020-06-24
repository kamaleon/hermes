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
      html: Yup.bool(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { profile } = req.body;

    const profileExists = await Profile.findOne({
      where: { user_id: req.userId, email: profile },
    });

    if (!profileExists) {
      return res.status(401).json({ error: 'Unknown profile.' });
    }

    const { password, to, subject, message, html } = req.body;

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
      html !== null && html
        ? {
            to,
            subject,
            html: message,
            attachments,
          }
        : {
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
