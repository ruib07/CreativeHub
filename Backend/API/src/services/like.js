module.exports = (app) => {
  const save = (registerLike) => app.db('likes').insert(registerLike, '*');

  const remove = (id) => app.db('likes')
    .where({ id })
    .del();

  return {
    save,
    remove,
  };
};
