const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:project_id', (req, res, next) => {
    app.services.view.findAll({ project_id: req.params.project_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.get('/byUser/:user_id', (req, res, next) => {
    app.services.view.findAll({ user_id: req.params.user_id })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
  });

  router.post('/', (req, res, next) => {
    app.services.view.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  return router;
};
