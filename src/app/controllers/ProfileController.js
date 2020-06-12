import * as Yup from 'yup';

import Profile from '../models/Profile';

class ProfileController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      smtp_server: Yup.string().required(),
      smtp_port: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const profileExists = await Profile.findOne({
      where: { user_id: req.userId, email },
    });

    if (profileExists) {
      return res
        .status(401)
        .json({ error: 'User already has a profile to this email' });
    }

    const { id, smtp_server, smtp_port } = await Profile.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json({
      id,
      email,
      smtp_server,
      smtp_port,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      smtp_server: Yup.string(),
      smtp_port: Yup.string(),
      password: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const profile = await Profile.findByPk(req.params.id);

    if (profile.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to update this profile." });
    }

    const email = req.body.email || profile.email;

    if (email && email !== profile.email) {
      const profileExists = await Profile.findOne({
        where: { user_id: req.userId, email },
      });

      if (profileExists) {
        return res
          .status(401)
          .json({ error: 'User already has a profile to this email' });
      }
    }

    const { id, smtp_server, smtp_port } = await profile.update(req.body);

    return res.json({
      id,
      email,
      smtp_server,
      smtp_port,
    });
  }
}

export default new ProfileController();
