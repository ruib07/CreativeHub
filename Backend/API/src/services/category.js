const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('categories');

  const save = (registerCategory) => {
    if (!registerCategory.name) throw new ValidationError('Name is required!');

    return app.db('categories').insert(registerCategory, '*');
  };

  const update = (id, categoryRes) => app.db('categories')
    .where({ id })
    .update(categoryRes, '*');

  const remove = (id) => app.db('categories')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    update,
    remove,
  };
};
