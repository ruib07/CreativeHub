/* eslint-disable camelcase */
module.exports = (app) => {
  const save = (registerLike) => app.db('likes').insert(registerLike, '*');

  const remove = (user_id, project_id) => app.db('likes')
    .where({ user_id, project_id })
    .del();

  return {
    save,
    remove,
  };
};
