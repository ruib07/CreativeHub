const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/', (req, res, next) => {
    app.services.like.save(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => next(error));
  });

  router.delete('/:user_id/:project_id', (req, res, next) => {
    app.services.like.remove(req.params.user_id, req.params.project_id)
      .then(() => res.status(204).send())
      .catch((error) => next(error));
  });

  return router;
};
