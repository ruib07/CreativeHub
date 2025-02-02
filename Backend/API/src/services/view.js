module.exports = (app) => {
  const findAll = (filter = {}) => app.db('views').where(filter);

  const save = (registerView) => app.db('views').insert(registerView, '*');

  return {
    findAll,
    save,
  };
};
