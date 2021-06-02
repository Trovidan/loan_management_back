const Loans = require("../../config/models/loans");
const {
  IMPROPER_REQUEST,
  ERROR,
  NO_CONTENT,
  SUCCESS,
} = require("../../utility/constants");

function getLoanDetails(filter, projection = "", multiple = false) {
  return new Promise((resolve, reject) => {
    if (!filter) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper query" });
      return;
    }
    Loans.find(filter, projection, (err, docs) => {
      if (err) {
        reject({
          status: ERROR,
          payload: "Encounterd error while fetching loan data",
        });
        return;
      }
      if (!docs || docs.length == 0) {
        resolve({ status: NO_CONTENT, payload: [] });
        return;
      }
      if (multiple) {
        resolve({ status: SUCCESS, payload: docs });
      } else {
        resolve({ status: SUCCESS, payload: docs[0] });
      }
    });
  });
}

module.exports = getLoanDetails;
