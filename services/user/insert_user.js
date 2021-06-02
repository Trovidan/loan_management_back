const users = require("../../config/models/users");
const { IMPROPER_REQUEST, INVALID_REQUEST, ERROR, SUCCESS } = require("../../utility/constants");

function insert_user(user_details) {
  return new Promise((resolve, reject) => {
    if (!validate_doc(user_details)) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper User Creation!" });
    }
    users.create(user_details, (err, item) => {
      if (err || !item) {
        if(err.code === 11000)
          reject({
            status: IMPROPER_REQUEST,
            payload: "User with this email already exists",
          });
        reject({
          status: ERROR,
          payload: err || "Unable to get any returned item",
        });
      }
      resolve({ status: SUCCESS, payload: item });
    });
  })
}

function validate_doc(user_details){
  if (!user_details) return false;
  if (!user_details.name) return false;
  if (!user_details.primary_email) return false;
  if (!user_details.phone_number) return false;
  return true;
}

module.exports = insert_user