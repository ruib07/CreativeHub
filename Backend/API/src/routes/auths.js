const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const secret = 'userCreativeHub@2025';

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', (req, res, next) => {
    app.services.user.find({
      name: req.body.name,
    })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            avatar_url: user.avatar_url,
          };

          const token = jwt.encode(payload, secret);
          res.status(200).json({ token, user: payload });
        } else {
          res.status(400).json({ error: 'Invalid authentication!' });
        }
      })
      .catch((error) => next(error));
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const result = await app.services.userRegistration.save(req.body);
      return res.status(201).json(result[0]);
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
