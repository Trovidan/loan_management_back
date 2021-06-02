//user power levels
const user_power = ['Super Admin', 'Admin', 'Manager', 'User'];

//allower origin
const whitelist = [
  "http://localhost:3000",
  "https://manage-loan.netlify.app",
];

//routes requiring authorization
const auth_route = [
  {
    path: "/auth/validate",
    min_power: "3",
  },
  {
    path: "/loan/fetch",
    min_power: "3",
  },
  {
    path: "/loan/create",
    min_power: "3",
  },
  {
    path: "/loan/action",
    min_power: "3",
  },
];

//status codes
const SUCCESS = 200;
const NO_CONTENT = 204;
const INVALID_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const IMPROPER_REQUEST = 406;
const ERROR = 500;
const UNDER_DEVELOPMENT = 501;

//loan status
const APPROVED = "APPROVED";
const PENDING = "PENDING";
const REJECTED = "REJECTED";
const WITHDRAWN = "WITHDRAWN";

module.exports = {
  user_power: user_power,
  SUCCESS: SUCCESS,
  NO_CONTENT: NO_CONTENT,
  INVALID_REQUEST: INVALID_REQUEST,
  UNAUTHORIZED: UNAUTHORIZED,
  FORBIDDEN: FORBIDDEN,
  IMPROPER_REQUEST: IMPROPER_REQUEST,
  ERROR: ERROR,
  UNDER_DEVELOPMENT: UNDER_DEVELOPMENT,
  auth_route: auth_route,
  whitelist: whitelist,
  APPROVED: APPROVED,
  PENDING: PENDING,
  REJECTED: REJECTED,
  WITHDRAWN: WITHDRAWN
};
