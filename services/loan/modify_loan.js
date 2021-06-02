const Loans = require("../../config/models/loans");
const { IMPROPER_REQUEST, ERROR, SUCCESS } = require("../../utility/constants");

function modify_loan(filter, updates, options = { runValidators: true, new: true, maxTimeMS: 2000 }) {
  return new Promise((resolve, reject) => {
    if (!filter || !updates) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper loan Updation!" });
    }
    Loans.updateMany(filter, updates, options, (err, doc) => {
      if (err) {
        reject({
          status: ERROR,
          payload: `Encountered error while Updation!`,
        });
      }
      resolve({ status: SUCCESS, payload: doc });
    });
  });
}

module.exports = modify_loan;
