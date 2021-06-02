const { ERROR, IMPROPER_REQUEST, NO_CONTENT, UNAUTHORIZED, SUCCESS } = require("../../../../utility/constants");
const { generateToken } = require("../../../../utility/token");
const getUserDetails = require("../../../../services/user/getUserDetails");

function login(req, res, next){
    let {email, password} = req.body;

    if(!email || !password){
        res.status(IMPROPER_REQUEST).send({status: IMPROPER_REQUEST, payload: "Valid email and pass required!"});
        return;
    }
    
    email = email.toString();
    password = password.toString();
    
    let filter = {
        primary_email: email
    }
    getUserDetails(filter).then( result=>{
        let user_detail = result.payload;
        if (result.status === NO_CONTENT || user_detail.password !== password){
          res
            .status(UNAUTHORIZED)
            .send({
              status: UNAUTHORIZED,
              payload: "Invalid email or password",
            });
            return;
        }
        
        let payload = {
            _id: user_detail._id,
            power: user_detail.power
        }
        res
          .status(SUCCESS)
          .send({ status: SUCCESS, payload: generateToken(payload) }); 
        return;
    }).catch(err=>{
        if(err.status)
            res.status(err.status).send(err);
        else   
            res.status(ERROR).send({status: ERROR, payload: "Encountered error while user verification!"})
        return;
    })
    return;
}

module.exports = login;