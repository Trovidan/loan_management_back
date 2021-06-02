const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

//router config
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const EMAIL_USER_AUTH = process.env.EMAIL_USER_AUTH;
const EMAIL_USER_PASS = process.env.EMAIL_USER_PASS;

function sendMail(to, subject, body) {
  // console.log('in send mail');
  return new Promise((resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: String(EMAIL_USER_AUTH),
          pass: String(EMAIL_USER_PASS),
        },
      });
      let mailOptions = {
        from: String(EMAIL_USER_AUTH),
        to: to,
        subject: subject,
        html: body,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          reject(false);
        }
        resolve(true);
      });
    } catch {
      reject(true);
    }
  });
}

module.exports = {
  sendMail: sendMail,
};
