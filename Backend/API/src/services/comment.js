const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('comments').where(filter);

  const save = (registerComment) => {
    if (!registerComment.comment) throw new ValidationError('Comment is required!');

    return app.db('comments').insert(registerComment, '*');
  };

  const remove = (id) => app.db('comments')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    remove,
  };
};
