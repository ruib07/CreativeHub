const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('users');

  const find = (filter = {}) => app.db('users').where(filter).first();

  const getPasswordHash = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };

  const validatePassword = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isLengthValid = password.length >= 9;

    return hasLowercase && hasUppercase && hasDigit && hasSpecialChar && isLengthValid;
  };

  const update = async (id, userRes) => {
    if (!validatePassword(userRes.password)) throw new ValidationError('Password doesnt meet the requirements!');

    const newUserInfo = { ...userRes };
    newUserInfo.password = getPasswordHash(userRes.password);

    return app.db('users')
      .where({ id })
      .update(newUserInfo, '*');
  };

  const remove = (id) => app.db('users')
    .where({ id })
    .del();

  return {
    findAll,
    find,
    update,
    remove,
  };
};
