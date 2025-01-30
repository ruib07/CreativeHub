const express = require('express');

module.exports = (app) => {
  const publicRouter = express.Router();
  const secureRouter = express.Router();

  app.use('/auth', app.routes.auths);
  app.use('/passwordrecovery', app.routes.passwordResets);

  publicRouter.use('/userRegistrations', app.routes.userRegistrations);

  publicRouter.use('/users', (req, res, next) => {
    const usersRouter = express.Router();

    usersRouter.get('/:id', app.routes.users.stack.find((r) => r.route.path === '/:id').route.stack[0].handle);

    return usersRouter(req, res, next);
  });

  publicRouter.use('/categories', (req, res, next) => {
    const categoriesRouter = express.Router();

    categoriesRouter.get('/', app.routes.categories.stack.find((r) => r.route.path === '/').route.stack[0].handle);

    return categoriesRouter(req, res, next);
  });

  publicRouter.use('/projects', (req, res, next) => {
    const projectsRouter = express.Router();

    projectsRouter.get('/', app.routes.projects.stack.find((r) => r.route.path === '/').route.stack[0].handle);
    projectsRouter.get('/:id', app.routes.projects.stack.find((r) => r.route.path === '/:id').route.stack[0].handle);

    return projectsRouter(req, res, next);
  });

  publicRouter.use('/comments', (req, res, next) => {
    const commentsRouter = express.Router();

    commentsRouter.get('/:project_id', app.routes.comments.stack.find((r) => r.route.path === '/:project_id').route.stack[0].handle);

    return commentsRouter(req, res, next);
  });

  secureRouter.use('/users', app.routes.users);
  secureRouter.use('/categories', app.routes.categories);
  secureRouter.use('/projects', app.routes.projects);
  secureRouter.use('/comments', app.routes.comments);
  secureRouter.use('/likes', app.routes.likes);
  secureRouter.use('/views', app.routes.views);

  app.use('/v1', publicRouter);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
