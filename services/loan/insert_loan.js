const Loans = require("../../config/models/loans");
const { IMPROPER_REQUEST, ERROR, SUCCESS } = require("../../utility/constants");

function insert_loan(loan_details) {
  return new Promise((resolve, reject) => {
    if (!validate_doc(loan_details)) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper loan application!" });
    }
    Loans.create(loan_details, (err, item) => {
      if (err || !item) {
        if (err.code === 11000)
          reject({
            status: IMPROPER_REQUEST,
            payload: "loan with these details already exists",
          });
        reject({
          status: ERROR,
          payload: err || "Unable to get any returned item",
        });
      }
      resolve({ status: SUCCESS, payload: item });
    });
  });
}

function validate_doc(loan_details) {
  if (!loan_details) return false;
  if (!loan_details.applicant_name) return false;
  if (!loan_details.applicant_address) return false;
  if (!loan_details.phone_number) return false;
  if (!loan_details.applicant_id) return false;
  if (!loan_details.issue_date) return false;
  if (!loan_details.termination_date) return false;
  if (!loan_details.emi) return false;
  
  
  return true;
}

module.exports = insert_loan;
