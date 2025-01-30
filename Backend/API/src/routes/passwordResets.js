/* eslint-disable consistent-return */
const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/reset-password', (req, res, next) => {
    app.services.user.find({ email: req.body.email })
      .then((user) => {
        if (!user) throw new Error('User not found');
        return app.services.passwordReset.sendPasswordResetEmail(req.body.email, user.id);
      })
      .then(() => res.status(200).json({ message: 'Password reset email sent' }))
      .catch((error) => next(error));
  });

  router.put('/change-password', (req, res, next) => {
    const { token, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    app.db('passwordresettoken').where({ token }).first()
      .then((tokenRecord) => {
        if (!tokenRecord || new Date() > tokenRecord.expirydate) {
          return Promise.reject(new Error('Invalid or expired token'));
        }
        return app.services.user.update(tokenRecord.user_id, { password: newPassword });
      })
      .then(() => app.db('passwordresettoken').where({ token }).del())
      .then(() => res.status(200).json({ message: 'Password changed successfully' }))
      .catch((error) => next(error));
  });

  return router;
};
