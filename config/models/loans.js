const mongoose = require("mongoose");
const { PENDING, REJECTED, APPROVED, WITHDRAWN } = require("../../utility/constants");
const type = mongoose.Schema.Types;

const loanSchema = new mongoose.Schema(
  {
    applicant_name: {
      type: String,
      required: true,
    },
    applicant_address: {
      type: String,
      required: true,
    },
    applicant_id: {
      type: type.ObjectId,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    loan_amount: {
      type: type.Number,
      required: true,
    },
    issue_date: {
      type: type.Date,
      required: true,
    },
    termination_date: {
      type: type.Date,
      required: true,
    },
    acceptance_date: {
      type: type.Date,
    },
    floating: {
      type: type.Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [PENDING, APPROVED, REJECTED, WITHDRAWN],
      default: PENDING
    },
    emi: {
      type: type.Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("loan", loanSchema);
