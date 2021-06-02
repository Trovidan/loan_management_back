const insert_loan = require("../../../../services/loan/insert_loan");
const {
  ERROR,
  IMPROPER_REQUEST,
  SUCCESS,
  APPROVED,
} = require("../../../../utility/constants.js");
const { extract_params } = require("./utils.js");

function create_user(req, res, next) {
  let extracted_details = extract_params(req.body);
  
  if (extracted_details.status === IMPROPER_REQUEST) {
    res.status(IMPROPER_REQUEST).send({
      status: IMPROPER_REQUEST,
      payload: "Incomplete loan details provided!",
    });
    return;
  }
  let loan_details = extracted_details.payload;
  loan_details.applicant_id = req.user_id;
  if(parseInt(req.power) < 2)
    loan_details.status = APPROVED
  console.log(req.power);
  insert_loan(loan_details)
    .then((result) => {
      res.status(SUCCESS).send({ status: SUCCESS, payload: result.payload });
      return;
    })
    .catch((err) => {
      if (err.status) res.status(err.status).send(err);
      else
        res
          .status(ERROR)
          .send({
            status: ERROR,
            payload: "Someting went wrong while creating user!",
          });
      return;
    });
}

module.exports = create_user;
