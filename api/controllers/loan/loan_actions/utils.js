const { IMPROPER_REQUEST, SUCCESS } = require("../../../../utility/constants");

function extract_params(params) {
  let { ids } = params;
  if (!Array.isArray(ids))
    return {
      status: IMPROPER_REQUEST,
      payload: "Invalid params",
    };
  let obj = {
    _id: {$in: ids}
  };
  return { status: SUCCESS, payload: obj };
}

module.exports = {
  extract_params: extract_params,
};
