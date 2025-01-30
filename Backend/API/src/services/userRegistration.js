const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
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

  const save = async (registerUser) => {
    if (!registerUser.name) throw new ValidationError('Name is required!');
    if (!registerUser.email) throw new ValidationError('Email is required!');
    if (!registerUser.password) throw new ValidationError('Password is required!');
    if (!registerUser.role) throw new ValidationError('Role is required!');
    if (!registerUser.bio) throw new ValidationError('Bio is required!');
    if (!registerUser.avatar_url) throw new ValidationError('Avatar is required!');

    if (!validatePassword(registerUser.password)) throw new ValidationError('Password doesnt meet the requirements!');

    const registerUserEmail = await find({ email: registerUser.email });
    if (registerUserEmail) throw new ValidationError('Email already exists!');

    const newUser = { ...registerUser };
    newUser.password = getPasswordHash(registerUser.password);

    return app.db('users').insert(newUser, '*');
  };

  return {
    save,
  };
};
