const { IMPROPER_REQUEST, SUCCESS } = require("../../../../utility/constants");
const { reg_email } = require("../../../../utility/regex");

function extract_params(params) {
  let {
    applicant_name,
    applicant_address,
    phone_number,
    issue_date,
    termination_date,
    floating,
    emi,
    email,
    loan_amount
  } = params;
  if (!applicant_address || !phone_number || !isValid_date(new Date(issue_date)) || !isValid_date(new Date(termination_date)) || !applicant_name || !loan_amount || !email || !reg_email.test(email.toString()) || !emi)
    return {
      status: IMPROPER_REQUEST,
      payload: "Invalid params",
    };
  let obj = {
    applicant_name: applicant_name.toString(),
    applicant_address: applicant_address.toString(),
    issue_date: new Date(issue_date),
    termination_date: new Date(termination_date),
    phone_number: phone_number.toString(),
    emi: parseFloat(emi),
    loan_amount: parseFloat(loan_amount),
    email: email.toString(),
    floating: floating ? true : false,
  };
  return { status: SUCCESS, payload: obj };
}

function isValid_date(date){
  if(date instanceof Date && Object.prototype.toString.call(date) === "[object Date]")
    return true;
  else 
    false
}

module.exports = {
    extract_params: extract_params
}