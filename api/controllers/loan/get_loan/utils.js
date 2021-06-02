const { IMPROPER_REQUEST, SUCCESS } = require("../../../../utility/constants");

function extract_params(params) {
  let {
    status
  } = params;
  if (!status)
    return {
      status: IMPROPER_REQUEST,
      payload: "Invalid params",
    };
  let obj = {
    status: status.toString()
  };
  return { status: SUCCESS, payload: obj };
}

module.exports = {
    extract_params: extract_params
}