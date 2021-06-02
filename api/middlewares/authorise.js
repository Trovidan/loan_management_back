const {
  ERROR,
  auth_route,
  UNAUTHORIZED,
} = require('../../utility/constants.js');
const { verifyToken } = require('../../utility/token.js');
//config

function authorise(req, res, next) {
  let dest = req.path;
  let token = req.headers.authorization;
  for (let i = 0; i < auth_route.length; i++) {
    let route = auth_route[i];
    let reg = new RegExp(`^${route.path}`);

    if (reg.test(dest)) {
      verifyToken(token)
        .then((result) => {
          let payload = result.payload;
          if (!payload.power || payload.power > route.min_power) {
            res.status(UNAUTHORIZED).send({
              status: UNAUTHORIZED,
              payload: 'Not authorized for this level of query!',
            });
            return;
          }
          req.user_id = payload._id;
          req.power = payload.power;
          next();
        })
        .catch((err) => {
          if (err.status) res.status(err.status).send(err);
          else
            res.status(ERROR).send({
              status: ERROR,
              payload: 'Something went wrong while user token verificaion',
            });
        });
      return;
    }
  }
  next();
}

module.exports = authorise;
