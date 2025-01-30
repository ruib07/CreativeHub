const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/', (req, res, next) => {
    app.services.view.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  return router;
};
