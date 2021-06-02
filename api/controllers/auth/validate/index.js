const { ERROR, NO_CONTENT, UNAUTHORIZED, SUCCESS} = require('../../../../utility/constants');
const getUserDetails = require('../../../../services/user/getUserDetails');

function validate(req, res, next) {
  let user_id = req.user_id;
  let filter = {
    _id: user_id? user_id: "",
  };
  let projection = {
    password: 0,
  };
  getUserDetails(filter, projection)
    .then((result) => {
      let user_detail = result.payload;
      if (result.status === NO_CONTENT) {
        res.status(UNAUTHORIZED).send({
          status: UNAUTHORIZED,
          payload: 'The user with requested ID not found',
        });
        return;
      }
      res.status(SUCCESS).send({ status: SUCCESS, payload: user_detail });
      return;
    })
    .catch((err) => {
      if (err.status) res.status(err.status).send(err);
      else
        res
          .status(ERROR)
          .send({
            status: ERROR,
            payload: 'Encountered error while user verification!',
          });
      return;
    });
  return;
}

module.exports = validate;
