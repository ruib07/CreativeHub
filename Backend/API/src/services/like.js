module.exports = (app) => {
  const findAll = (filter = {}) => app.db('likes').where(filter);

  const save = (registerLike) => app.db('likes').insert(registerLike, '*');

  const remove = (id) => app.db('likes')
    .where({ id })
    .del();

  return {
    findAll,
    save,
    remove,
  };
};
