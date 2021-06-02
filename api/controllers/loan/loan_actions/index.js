const modify_loan = require("../../../../services/loan/modify_loan");
const {
  ERROR,
  IMPROPER_REQUEST,
  SUCCESS,
  WITHDRAWN,
  APPROVED,
} = require("../../../../utility/constants.js");
const { extract_params } = require("./utils.js");

function loan_actions(req, res, next) {
  let extracted_details = extract_params(req.body);

  if (extracted_details.status === IMPROPER_REQUEST) {
    res.status(IMPROPER_REQUEST).send({
      status: IMPROPER_REQUEST,
      payload: "Invalid loan status provided!",
    });
    return;
  }
  let filter = extracted_details.payload;
  let update;
  if (req.power > 1) {
    filter["applicant_id"] = req.user_id;
    update = {
      $set: {
        status: WITHDRAWN,
      },
    };
  } else {
    update = {
      $set: {
        status: APPROVED,
      },
    };
  }
  modify_loan(filter, update)
    .then((result) => {
      res.status(SUCCESS).send(result);
      return;
    })
    .catch((err) => {
      if (err.status) res.status(err.status).send(err);
      else
        res.status(ERROR).send({
          status: ERROR,
          payload: "Someting went wrong while creating user!",
        });
      return;
    });
}

module.exports = loan_actions;