const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = (app) => {
  const generateResetToken = () => crypto.randomBytes(32).toString('hex');

  const sendPasswordResetEmail = async (userEmail, userId) => {
    const token = generateResetToken();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await app.db('passwordresettoken').insert({
      token,
      expirydate: expiryDate,
      user_id: userId,
    });

    const resetLink = `http://localhost:3000/RecoverPassword/ChangePassword?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'youremail@gmail.com',
        pass: process.env.EMAIL_PASS || 'flbl ifag fgbq xcex',
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
  };

  return {
    sendPasswordResetEmail,
  };
};
