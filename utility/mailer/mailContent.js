function resetPrimaryMail(firstName, link) {
  return {
    subject: 'Reset your Primary Email',
    body: `<div><h2>Greetings ${firstName},</h2><br>
        We have received your request to update your primary e-mail <br>
        To reset your e-mail follow this link:  <a href=${link}>RESET LINK </a> </div>`,
  };
}
function resetPassword(link) {
  return {
    subject: "Link to reset password",
    body: `<div><h2>Greetings,</h2><br>
        We have received your request to update your password <br>
        To reset your password follow this link:  <a href=${link}>RESET LINK </a> </div>`
  }
}

module.exports = {
  resetPrimaryMail: resetPrimaryMail,
  resetPassword: resetPassword,
};
