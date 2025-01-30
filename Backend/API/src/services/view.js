module.exports = (app) => {
  const save = (registerView) => app.db('views').insert(registerView, '*');

  return {
    save,
  };
};
