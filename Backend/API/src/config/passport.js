const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'userCreativeHub@2025';

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    app.services.user.find({ id: payload.id })
      .then((user) => {
        if (user) {
          done(null, { ...payload });
        } else {
          done(null, false);
        }
      }).catch((error) => done(error, false));
  });

  passport.use('jwt', strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
