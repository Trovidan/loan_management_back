const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { IMPROPER_REQUEST, ERROR, SUCCESS } = require('./constants.js');

//config
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const SECRET = process.env.TOKEN_SECRET;

function generateToken(payload, exp = '', subject = '', audience = '') {
  payload = payload === undefined ? 'No Payload' : payload;
  let options = {
    issuer: 'Loan Management App',
    audience: audience === '' ? 'USER' : audience,
    subject: subject === '' ? 'Loan Management Issued Token' : subject,
    expiresIn: exp === '' ? '12h' : exp,
  };
  return jwt.sign(payload, SECRET, options);
}

function verifyToken(token, audience = '') {
  return new Promise((resolve, reject) => {
    if (!token)
      reject({ status: IMPROPER_REQUEST, payload: 'token is required' });

    let options = {
      issuer: 'Loan Management App',
      audience: audience === '' ? 'USER' : audience,
    };
    jwt.verify(token, SECRET, options, function (err, decoded) {
      if (err)
        reject({ status: ERROR, payload: `error while verification: ${err}` });
      resolve({ status: SUCCESS, payload: decoded });
    });
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
