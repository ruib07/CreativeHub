const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('projects');

  const find = (filter = {}) => app.db('projects').where(filter).first();

  const save = (registerProject) => {
    if (!registerProject.title) throw new ValidationError('Title is required!');
    if (!registerProject.description) throw new ValidationError('Description is required!');
    if (!registerProject.tags) throw new ValidationError('Tags are required!');
    if (!registerProject.image_urls) throw new ValidationError('Images are required!');

    return app.db('projects').insert(registerProject, '*');
  };

  const update = (id, projectRes) => app.db('projects')
    .where({ id })
    .update(projectRes, '*');

  const remove = (id) => app.db('projects')
    .where({ id })
    .del();

  return {
    findAll,
    find,
    save,
    update,
    remove,
  };
};
