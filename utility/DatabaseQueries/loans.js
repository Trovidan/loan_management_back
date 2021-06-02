const {
  IMPROPER_REQUEST,
  ERROR,
  NO_CONTENT,
  SUCCESS,
  INVALID_REQUEST,
} = require("../constants.js");
const loan = require("../../config/models/loans.js");

function find_loans(filter, projection = "", options = {}) {
  return new Promise((resolve, reject) => {
    if (!filter) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper find query" });
    }

    loan.find(filter, projection, options, (err, docs) => {
      if (err) {
        reject({ status: ERROR, payload: err });
      }
      if (!docs || docs.length == 0) {
        resolve({ status: NO_CONTENT, payload: [] });
      }
      resolve({ status: SUCCESS, payload: docs });
    });
  });
}

function create_loan(doc) {
    return new Promise((resolve, reject) => {
        if (!doc) {
        reject({ status: IMPROPER_REQUEST, payload: "Improper loan Creation!" });
        }
        loan.create(doc, (err, item) => {
        if (err || !item) {
            reject({
            status: ERROR,
            payload: err || "Unable to get any returned item",
            });
            return;
        }
        resolve({ status: SUCCESS, payload: item });
        return;
        }).catch((err) => {
            reject({ status: ERROR, payload: err });
        });
    })
}

function modify_loan(
  filter,
  updates,
  options = { runValidators: true, new: true, maxTimeMS: 2000 }
) {
  return new Promise((resolve, reject) => {
    if (!filter || !updates) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper loan Updation!" });
    }
    loan.findOneAndUpdate(filter, updates, options, (err, doc) => {
      if (err || !doc) {
        reject({
          status: ERROR,
          payload: err
            ? `Encountered error while Updation! + ${err}`
            : "Fatal error! loan is not registered!",
        });
      }
      resolve({ status: SUCCESS, payload: doc });
    });
  });
}

function modify_loans(
  filter,
  updates,
  options = { runValidators: true, maxTimeMS: 2000 }
) {
  return new Promise((resolve, reject) => {
    if (!filter || !updates) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper loan Updation!" });
    }
    loan.updateMany(filter, updates, options, (err, doc) => {
      if (err) {
        reject({
          status: ERROR,
          payload: `Encountered error while Updation! + ${err}`,
        });
      }
      resolve({ status: SUCCESS, payload: doc });
    });
  });
}

function delete_loans(filter) {
  return new Promise((resolve, reject) => {
    if (!filter) {
      reject({
        status: IMPROPER_REQUEST,
        payload: "Improper loan Updation!",
      });
    }
    loan.deleteMany(filter, (err, doc) => {
      if (err) {
        reject({
          status: ERROR,
          payload: `Encountered error while deletion! + ${err}`,
        });
      }
      resolve({ status: SUCCESS, payload: "Successfully deleted" });
    });
  });
}

module.exports = {
  find_loans: find_loans,
  create_loan: create_loan,
  modify_loan: modify_loan,
  modify_loans: modify_loans,
  delete_loans: delete_loans,
};
