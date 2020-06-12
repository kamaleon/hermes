import nodemailer from 'nodemailer';

class Mail {
  sendMail(config, message) {
    const transporter = nodemailer.createTransport(config);
    return transporter.sendMail(message);
  }
}

export default new Mail();
