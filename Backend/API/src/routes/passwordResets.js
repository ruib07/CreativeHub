/* eslint-disable consistent-return */
const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/reset-password', (req, res, next) => {
    app.services.user.find({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
        return app.services.passwordReset.sendPasswordResetEmail(req.body.email, user.id);
      })
      .then(() => res.status(200).json({ message: 'Password reset email sent' }))
      .catch((error) => next(error));
  });

  router.put('/change-password', async (req, res, next) => {
    const { token, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      const tokenRecord = await app.db('passwordresettoken').where({ token }).first();

      if (!tokenRecord || new Date() > tokenRecord.expirydate) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      await app.services.user.update(tokenRecord.user_id, { password: newPassword });
      await app.db('passwordresettoken').where({ token }).del();

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
