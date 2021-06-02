const insert_user = require('../../../../services/user/insert_user.js');
const { ERROR, IMPROPER_REQUEST, SUCCESS } = require('../../../../utility/constants.js');
const randomstring = require('randomstring');


function create_user(req,res,next){
    let {name, primary_email, phone_number, password, power} = req.body;
    let user_details = {
        name: name,
        primary_email: primary_email, 
        phone_number: phone_number,
        power: power,
        password: password
    }
    user_details = checkPass(user_details);
    if(!validate_doc(user_details)){
        res
          .status(IMPROPER_REQUEST)
          .send({
            status: IMPROPER_REQUEST,
            payload: "Incomplete user details proided!",
          });
        return;
    }
    insert_user(user_details).then(result=>{
        res.status(SUCCESS).send({status: SUCCESS, payload: result.payload});
        return;
    }).catch(err=>{
        if(err.status)
            res.status(err.status).send(err);
        else
            res.status(ERROR).send({status: ERROR, payload: "Someting went wrong while creating user!"});
        return;
    })
}

function checkPass(user_details){
    if (!user_details.password){
      user_details.password = randomstring.generate({
        length: 12,
        charset: `[0-9 a-z A-Z @ ! # $ % & ]`,
      });
    }
    return user_details;
}

function validate_doc(user_details) {
  if (!user_details) return false;
  if (!user_details.name) return false;
  if (!user_details.primary_email) return false;
  if (!user_details.phone_number) return false;
  return true;
}

module.exports = create_user